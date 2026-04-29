import { describe, it, expect } from 'vitest';
import { ErrorCode } from '../src/error-code.js';

describe('ErrorCode', () => {
  it('has all expected error codes', () => {
    expect(ErrorCode.VALIDATION_FAILED).toBe('VALIDATION_FAILED');
    expect(ErrorCode.NOT_FOUND).toBe('NOT_FOUND');
    expect(ErrorCode.UNAUTHORIZED).toBe('UNAUTHORIZED');
    expect(ErrorCode.RATE_LIMITED).toBe('RATE_LIMITED');
    expect(ErrorCode.INTERNAL_ERROR).toBe('INTERNAL_ERROR');
  });

  it('prevents accidental deletion during refactoring', () => {
    const codes = Object.values(ErrorCode);
    expect(codes).toHaveLength(5);
    expect(codes).toContain('VALIDATION_FAILED');
    expect(codes).toContain('NOT_FOUND');
    expect(codes).toContain('UNAUTHORIZED');
    expect(codes).toContain('RATE_LIMITED');
    expect(codes).toContain('INTERNAL_ERROR');
  });
});
