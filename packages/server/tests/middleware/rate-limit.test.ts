import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Hono } from 'hono';
import { createRateLimitMiddleware } from '../../src/middleware/rate-limit.js';
import { env } from '../../src/env.js';
import { ErrorCode } from '@repo/config';

describe('Rate Limit middleware', () => {
  const originalRateLimitEnabled = env.RATE_LIMIT_ENABLED;

  beforeEach(() => {
    env.RATE_LIMIT_ENABLED = false;
  });

  afterEach(() => {
    env.RATE_LIMIT_ENABLED = originalRateLimitEnabled;
  });

  function createTestApp(maxRequests: number) {
    const app = new Hono();
    const rateLimit = createRateLimitMiddleware({ maxRequests, windowMs: 60000 });
    app.use(rateLimit);
    app.get('/test', (c) => c.json({ ok: true }));
    return app;
  }

  it('allows requests when rate limiting is disabled', async () => {
    const app = createTestApp(2);

    for (let i = 0; i < 5; i++) {
      const res = await app.request('/test');
      expect(res.status).toBe(200);
    }
  });

  it('triggers 429 when rate limit is exceeded', async () => {
    env.RATE_LIMIT_ENABLED = true;
    const app = createTestApp(2);

    // First 2 requests should succeed
    const res1 = await app.request('/test');
    expect(res1.status).toBe(200);

    const res2 = await app.request('/test');
    expect(res2.status).toBe(200);

    // 3rd request should be rate limited
    const res3 = await app.request('/test');
    expect(res3.status).toBe(429);
    const body = (await res3.json()) as { ok: boolean; error: { code: string } };
    expect(body.ok).toBe(false);
    expect(body.error.code).toBe(ErrorCode.RATE_LIMITED);
  });
});
