import type { Context, Next } from 'hono';
import { fail, ErrorCode } from '@repo/config';
import { env, getResolvedApiKey } from '../env.js';

export const apiKeyAuth = async (c: Context, next: Next): Promise<Response | void> => {
  if (c.req.path.startsWith('/api/health')) {
    await next();
    return;
  }

  if (!env.API_KEY) {
    await next();
    return;
  }

  const headerKey = c.req.header('x-api-key');
  if (!headerKey || headerKey !== getResolvedApiKey()) {
    return c.json(fail(ErrorCode.UNAUTHORIZED, 'Invalid or missing API key'), 401);
  }

  await next();
};
