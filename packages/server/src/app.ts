import { Hono } from 'hono';
import type { DB } from './db/index.js';
import { createCorsMiddleware } from './middleware/cors.js';
import { requestLogger } from './middleware/logger.js';
import { apiKeyAuth } from './middleware/api-key.js';
import { rateLimit } from './middleware/rate-limit.js';
import { errorHandler } from './middleware/error.js';
import { healthRoutes } from './routes/health.js';
import { createTaskRoutes } from './routes/tasks.js';
import { createProviderRoutes } from './routes/providers.js';
import { startModelsSyncScheduler } from './services/models-sync.js';

export function createApp(db: DB): Hono {
  const app = new Hono();

  // Start background sync scheduler
  startModelsSyncScheduler(db);

  // Global middleware (order matters)
  app.use(createCorsMiddleware());
  app.use(requestLogger);
  app.use(apiKeyAuth);
  app.use(rateLimit);

  // Routes
  app.route('/', healthRoutes);
  app.route('/', createTaskRoutes(db));
  app.route('/', createProviderRoutes(db));

  // Error handler (must be last)
  app.onError(errorHandler);

  return app;
}
