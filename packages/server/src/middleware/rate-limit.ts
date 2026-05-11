import type { Context, Next } from 'hono';
import { fail, ErrorCode } from '@repo/config';
import { env } from '../env.js';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

const DEFAULT_MAX_REQUESTS = 100;
const DEFAULT_WINDOW_MS = 60 * 1000; // 1 minute

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetTime <= now) {
      store.delete(key);
    }
  }
}

export const cleanupInterval = setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
cleanupInterval.unref();

function getClientIp(c: Context): string {
  if (!env.TRUSTED_PROXIES) {
    return 'unknown';
  }

  const forwarded = c.req.header('x-forwarded-for');
  if (!forwarded) {
    return 'unknown';
  }

  // Take the last IP in the chain (closest to the server) when behind trusted proxies.
  const ips = forwarded.split(',').map((s) => s.trim());
  const clientIp = ips[ips.length - 1];
  return clientIp || 'unknown';
}

export function createRateLimitMiddleware(config: Partial<RateLimitConfig> = {}) {
  const maxRequests = config.maxRequests ?? DEFAULT_MAX_REQUESTS;
  const windowMs = config.windowMs ?? DEFAULT_WINDOW_MS;

  return async (c: Context, next: Next): Promise<Response | void> => {
    if (!env.RATE_LIMIT_ENABLED) {
      await next();
      return;
    }

    const ip = getClientIp(c);
    const now = Date.now();

    const entry = store.get(ip);

    if (!entry || entry.resetTime <= now) {
      store.set(ip, { count: 1, resetTime: now + windowMs });
      await next();
      return;
    }

    if (entry.count >= maxRequests) {
      return c.json(fail(ErrorCode.RATE_LIMITED, 'Rate limit exceeded'), 429);
    }

    entry.count++;
    await next();
  };
}

export const rateLimit = createRateLimitMiddleware();
