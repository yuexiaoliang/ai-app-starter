import { describe, it, expect } from 'vitest';
import { EnvSchema } from '../src/env.js';

describe('EnvSchema', () => {
  it('parses valid environment variables', () => {
    const result = EnvSchema.safeParse({
      PORT: '3000',
      NODE_ENV: 'production',
      DATABASE_URL: 'file:/tmp/test.db',
      API_KEY: 'test-key',
      CORS_ORIGINS: 'https://example.com',
      RATE_LIMIT_ENABLED: 'true',
      LOG_LEVEL: 'debug',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.PORT).toBe(3000);
      expect(result.data.NODE_ENV).toBe('production');
      expect(result.data.DATABASE_URL).toBe('file:/tmp/test.db');
      expect(result.data.API_KEY).toBe('test-key');
      expect(result.data.CORS_ORIGINS).toBe('https://example.com');
      expect(result.data.RATE_LIMIT_ENABLED).toBe(true);
      expect(result.data.LOG_LEVEL).toBe('debug');
    }
  });

  it('applies defaults for missing optional fields', () => {
    const result = EnvSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.PORT).toBe(13001);
      expect(result.data.NODE_ENV).toBe('development');
      expect(result.data.RATE_LIMIT_ENABLED).toBe(false);
      expect(result.data.LOG_LEVEL).toBe('info');
      expect(result.data.API_KEY).toBeUndefined();
    }
  });

  it('fails on invalid PORT', () => {
    const result = EnvSchema.safeParse({ PORT: 'not-a-number' });
    expect(result.success).toBe(false);
  });

  it('fails on out-of-range PORT', () => {
    const result = EnvSchema.safeParse({ PORT: '99999' });
    expect(result.success).toBe(false);
  });
});
