import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { sql, like, eq, desc, asc, and } from 'drizzle-orm';
import type { DB } from '../db/index.js';
import { providers, models } from '../db/schema.js';
import { ok, fail, ErrorCode } from '@repo/config';

const ListProvidersQuery = z.object({
  name: z.string().optional(),
  modelName: z.string().optional(),
  sortBy: z.enum(['name', 'modelCount']).optional().default('name'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  page: z.coerce.number().min(1).optional().default(1),
  pageSize: z.coerce.number().min(1).max(100).optional().default(20),
});

type ListProvidersQuery = z.infer<typeof ListProvidersQuery>;

const ListModelsQuery = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  pageSize: z.coerce.number().min(1).max(100).optional().default(20),
});

export function createProviderRoutes(db: DB) {
  const app = new Hono();

  app.get('/api/providers', zValidator('query', ListProvidersQuery), async (c) => {
    const query = c.req.valid('query');

    // Build filters
    const conditions = [];

    if (query.name) {
      conditions.push(like(providers.name, `%${query.name}%`));
    }

    let providerIds: string[] | undefined;

    if (query.modelName) {
      const matchingModels = db
        .select({ providerId: models.providerId })
        .from(models)
        .where(like(models.name, `%${query.modelName}%`))
        .all();
      providerIds = [...new Set(matchingModels.map((m) => m.providerId))];
      if (providerIds.length === 0) {
        return c.json(ok({ items: [], total: 0, page: query.page, pageSize: query.pageSize }));
      }
      conditions.push(sql`${providers.id} IN ${providerIds}`);
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Count total
    const countResult = db
      .select({ count: sql<number>`count(*)` })
      .from(providers)
      .where(whereClause)
      .get();
    const total = countResult?.count ?? 0;

    // Sort
    const orderBy =
      query.sortBy === 'modelCount'
        ? query.sortOrder === 'desc'
          ? desc(providers.modelCount)
          : asc(providers.modelCount)
        : query.sortOrder === 'desc'
          ? desc(providers.name)
          : asc(providers.name);

    // Pagination
    const offset = (query.page - 1) * query.pageSize;

    const items = db
      .select()
      .from(providers)
      .where(whereClause)
      .orderBy(orderBy)
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

    const countResult = db
      .select({ count: sql<number>`count(*)` })
      .from(models)
      .where(eq(models.providerId, id))
      .get();
    const total = countResult?.count ?? 0;

    const offset = (query.page - 1) * query.pageSize;

    const items = db
      .select()
      .from(models)
      .where(eq(models.providerId, id))
      .orderBy(asc(models.name))
      .limit(query.pageSize)
      .offset(offset)
      .all();

    return c.json(ok({ items, total, page: query.page, pageSize: query.pageSize }));
  });

  return app;
}
