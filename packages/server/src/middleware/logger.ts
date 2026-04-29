import { pino } from 'pino';
import type { MiddlewareHandler } from 'hono';
import { env } from '../env.js';

function createLogger() {
  if (env.NODE_ENV === 'production') {
    return pino({ level: env.LOG_LEVEL });
  }

  return pino({
    level: env.LOG_LEVEL,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  });
}

export const logger = createLogger();

export const requestLogger: MiddlewareHandler = async (c, next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;

  logger.info({
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    duration: `${duration}ms`,
  });
};
