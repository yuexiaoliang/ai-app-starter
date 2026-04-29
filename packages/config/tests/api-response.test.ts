import { describe, it, expect } from 'vitest';
import { ok, fail } from '../src/api-response.js';
import { ErrorCode } from '../src/error-code.js';

describe('ApiResponse constructors', () => {
  it('ok() returns success envelope', () => {
    const result = ok({ test: true, value: 42 });
    expect(result).toEqual({ ok: true, data: { test: true, value: 42 } });
  });

  it('ok() works with primitive data', () => {
    expect(ok('hello')).toEqual({ ok: true, data: 'hello' });
    expect(ok(123)).toEqual({ ok: true, data: 123 });
  });

  it('fail() returns error envelope with code and message', () => {
    const result = fail(ErrorCode.NOT_FOUND, 'Resource not found');
    expect(result).toEqual({
      ok: false,
      error: { code: 'NOT_FOUND', message: 'Resource not found' },
    });
  });

  it('fail() includes details when provided', () => {
    const details = { field: 'id', expected: 'string' };
    const result = fail(ErrorCode.VALIDATION_FAILED, 'Invalid input', details);
    expect(result).toEqual({
      ok: false,
      error: {
        code: 'VALIDATION_FAILED',
        message: 'Invalid input',
        details,
      },
    });
  });
});
