import { describe, it, expect } from 'vitest';
import { ServerUrlSchema } from '../src/url-schema.js';

describe('ServerUrlSchema', () => {
  it('parses a valid HTTP URL', () => {
    const result = ServerUrlSchema.safeParse('http://localhost:13001');
    expect(result.success).toBe(true);
  });

  it('parses a valid HTTPS URL', () => {
    const result = ServerUrlSchema.safeParse('https://api.example.com');
    expect(result.success).toBe(true);
  });

  it('fails on invalid URL', () => {
    const result = ServerUrlSchema.safeParse('not-a-url');
    expect(result.success).toBe(false);
  });

  it('fails on empty string', () => {
    const result = ServerUrlSchema.safeParse('');
    expect(result.success).toBe(false);
  });

  it('fails on URL without protocol', () => {
    const result = ServerUrlSchema.safeParse('example.com/path');
    expect(result.success).toBe(false);
  });
});
