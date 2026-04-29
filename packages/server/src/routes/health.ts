import { Hono } from 'hono';
import { ok, APP_VERSION } from '@repo/config';

export const healthRoutes = new Hono();

healthRoutes.get('/api/health', (c) => {
  return c.json(
    ok({
      status: 'ok' as const,
      timestamp: new Date().toISOString(),
      version: APP_VERSION,
    })
  );
});
