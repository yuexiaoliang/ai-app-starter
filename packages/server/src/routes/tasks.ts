import { Hono } from 'hono';
import { taskContract, bindContractToHono } from '@repo/contracts';
import type { DB } from '@repo/core/db';
import { createTaskHandlers } from '@repo/core/handlers';

export function createTaskRoutes(db: DB) {
  const app = new Hono();
  const handlers = createTaskHandlers(db);
  bindContractToHono(app, taskContract, handlers);
  return app;
}
