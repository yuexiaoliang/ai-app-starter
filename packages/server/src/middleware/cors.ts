import { cors } from 'hono/cors';
import { env, getCorsOrigins } from '../env.js';

export function createCorsMiddleware() {
  if (env.NODE_ENV !== 'production') {
    return cors({
      origin: (origin) => {
        if (!origin || origin.startsWith('http://localhost:')) {
          return origin || '*';
        }
        return null;
      },
      credentials: true,
    });
  }

  const allowedOrigins = getCorsOrigins();

  return cors({
    origin: allowedOrigins,
    credentials: true,
  });
}
