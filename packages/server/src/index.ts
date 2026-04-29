import 'dotenv/config';
import { serve } from '@hono/node-server';
import { env, getResolvedApiKey } from './env.js';
import { createDb } from './db/index.js';
import { createApp } from './app.js';
import { logger } from './middleware/logger.js';
import { cleanupInterval } from './middleware/rate-limit.js';
import { DEFAULT_WEB_PORT } from '@repo/config';

const { db, sqlite } = createDb(env.DATABASE_URL);
const app = createApp(db);

const server = serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    logger.info(`Server listening on port ${info.port}`);

    if (env.API_KEY) {
      logger.info(`API Key: ${getResolvedApiKey()}`);
    }

    logger.info(
      `Frontend access: http://localhost:${DEFAULT_WEB_PORT}/?api-key=${getResolvedApiKey()}`
    );
  }
);

function shutdown(signal: string): void {
  logger.info(`Received ${signal}, shutting down gracefully...`);

  clearInterval(cleanupInterval);

  server.close(() => {
    logger.info('Server closed');
    sqlite.close();
    logger.info('Database connection closed');
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
