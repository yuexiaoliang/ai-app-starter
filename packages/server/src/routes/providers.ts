import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { sql, like, eq, desc, asc, and, or } from 'drizzle-orm';
import type { DB } from '../db/index.js';
import { providers, models } from '../db/schema.js';
import { ok, fail, ErrorCode } from '@repo/config';

const ListProvidersQuery = z.object({
  query: z.string().optional(),
  sortBy: z.enum(['name', 'modelCount']).optional().default('name'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  page: z.coerce.number().min(1).optional().default(1),
  pageSize: z.coerce.number().min(1).max(100).optional().default(20),
});

type ListProvidersQuery = z.infer<typeof ListProvidersQuery>;

const ListModelsQuery = z.object({
  query: z.string().optional(),
  page: z.coerce.number().min(1).optional().default(1),
  pageSize: z.coerce.number().min(1).max(100).optional().default(20),
});

export function createProviderRoutes(db: DB) {
  const app = new Hono();

  app.get('/api/providers', zValidator('query', ListProvidersQuery), async (c) => {
    const query = c.req.valid('query');

    // Build filters — a single query matches provider name OR any of its model names
    let whereClause;

    if (query.query) {
      const nameLike = like(providers.name, `%${query.query}%`);

      const matchingModels = db
        .select({ providerId: models.providerId })
        .from(models)
        .where(like(models.name, `%${query.query}%`))
        .all();
      const providerIds = [...new Set(matchingModels.map((m) => m.providerId))];

      if (providerIds.length > 0) {
        whereClause = or(nameLike, sql`${providers.id} IN ${providerIds}`);
      } else {
        whereClause = nameLike;
      }
    }

    // Count total
    const countResult = db
      .select({ count: sql<number>`count(*)` })
      .from(providers)
      .where(whereClause)
      .get();
    const total = countResult?.count ?? 0;

    // Sort — name matches first when a query is present
    const baseOrderBy =
      query.sortBy === 'modelCount'
        ? query.sortOrder === 'desc'
          ? desc(providers.modelCount)
          : asc(providers.modelCount)
        : query.sortOrder === 'desc'
          ? desc(providers.name)
          : asc(providers.name);

    const orderBy = query.query
      ? [sql`CASE WHEN ${providers.name} LIKE ${`%${query.query}%`} THEN 0 ELSE 1 END`, baseOrderBy]
      : [baseOrderBy];

    // Pagination
    const offset = (query.page - 1) * query.pageSize;

    const items = db
      .select()
      .from(providers)
      .where(whereClause)
      .orderBy(...orderBy)
      .limit(query.pageSize)
      .offset(offset)
      .all();

    return c.json(ok({ items, total, page: query.page, pageSize: query.pageSize }));
  });

  app.get('/api/providers/:id', async (c) => {
    const id = c.req.param('id');
    const provider = db.select().from(providers).where(eq(providers.id, id)).get();

    if (!provider) {
      return c.json(fail(ErrorCode.NOT_FOUND, `Provider ${id} not found`), 404);
    }

    return c.json(ok(provider));
  });

  app.get('/api/providers/:id/models', zValidator('query', ListModelsQuery), async (c) => {
    const id = c.req.param('id');
    const query = c.req.valid('query');

    const provider = db.select().from(providers).where(eq(providers.id, id)).get();
    if (!provider) {
      return c.json(fail(ErrorCode.NOT_FOUND, `Provider ${id} not found`), 404);
    }

    const modelWhere = query.query
      ? and(eq(models.providerId, id), like(models.name, `%${query.query}%`))
      : eq(models.providerId, id);

    const countResult = db
      .select({ count: sql<number>`count(*)` })
      .from(models)
      .where(modelWhere)
      .get();
    const total = countResult?.count ?? 0;

    const offset = (query.page - 1) * query.pageSize;

    const items = db
      .select()
      .from(models)
      .where(modelWhere)
      .orderBy(asc(models.name))
      .limit(query.pageSize)
      .offset(offset)
      .all();

    return c.json(ok({ items, total, page: query.page, pageSize: query.pageSize }));
  });

  return app;
}
