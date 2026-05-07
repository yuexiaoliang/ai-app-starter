import { Hono } from 'hono';
import { providerContract, bindContractToHono } from '@repo/contracts';
import type { DB } from '@repo/core/db';
import { createProviderHandlers } from '@repo/core/handlers';

export function createProviderRoutes(db: DB) {
  const app = new Hono();
  const handlers = createProviderHandlers(db);
  bindContractToHono(app, providerContract, handlers);
  return app;
}
