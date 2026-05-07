import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { ok, fail, ErrorCode } from '@repo/config';
import type { DB } from '@repo/core/db';
import { ProviderRepository } from '@repo/core/repositories';

const ListProvidersQuery = z.object({
  query: z.string().optional(),
  sortBy: z.enum(['name', 'modelCount']).optional().default('name'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  page: z.coerce.number().min(1).optional().default(1),
  pageSize: z.coerce.number().min(1).max(100).optional().default(20),
});

const ListModelsQuery = z.object({
  query: z.string().optional(),
  page: z.coerce.number().min(1).optional().default(1),
  pageSize: z.coerce.number().min(1).max(100).optional().default(20),
});

export function createProviderRoutes(db: DB) {
  const app = new Hono();
  const repo = new ProviderRepository(db);

  app.get('/api/providers', zValidator('query', ListProvidersQuery), async (c) => {
    const query = c.req.valid('query');
    const result = await repo.list({
      query: query.query,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      page: query.page,
      pageSize: query.pageSize,
    });
    return c.json(ok(result));
  });

  app.get('/api/providers/:id', async (c) => {
    const id = c.req.param('id');
    const provider = await repo.findById(id);

    if (!provider) {
      return c.json(fail(ErrorCode.NOT_FOUND, `Provider ${id} not found`), 404);
    }

    return c.json(ok(provider));
  });

  app.get('/api/providers/:id/models', zValidator('query', ListModelsQuery), async (c) => {
    const id = c.req.param('id');
    const query = c.req.valid('query');

    const provider = await repo.findById(id);
    if (!provider) {
      return c.json(fail(ErrorCode.NOT_FOUND, `Provider ${id} not found`), 404);
    }

    const result = await repo.listModels({
      providerId: id,
      query: query.query,
      page: query.page,
      pageSize: query.pageSize,
    });

    return c.json(ok(result));
  });

  return app;
}
