import { ZodError } from 'zod';
import type { ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { fail, ErrorCode } from '@repo/config';
import { logger } from './logger.js';
import { env } from '../env.js';

export const errorHandler: ErrorHandler = (err, c) => {
  if (err instanceof ZodError) {
    return c.json(fail(ErrorCode.VALIDATION_FAILED, 'Validation failed', err.issues), 400);
  }

  if (err instanceof HTTPException && err.status === 404) {
    return c.json(fail(ErrorCode.NOT_FOUND, 'Not found'), 404);
  }

  const requestId = crypto.randomUUID();

  if (env.NODE_ENV === 'production') {
    logger.error({ requestId, path: c.req.path, method: c.req.method }, 'Unexpected error');
    return c.json(fail(ErrorCode.INTERNAL_ERROR, 'Internal server error'), 500);
  }

  logger.error({ requestId, err, path: c.req.path, method: c.req.method }, 'Unexpected error');
  const message = err instanceof Error ? err.message : 'Internal server error';
  return c.json(fail(ErrorCode.INTERNAL_ERROR, message), 500);
};
