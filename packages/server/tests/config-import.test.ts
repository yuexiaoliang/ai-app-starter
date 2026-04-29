import { describe, it, expect } from 'vitest';
import {
  ok,
  fail,
  ErrorCode,
  TaskSchema,
  DEFAULT_SERVER_PORT,
  APP_NAME,
  APP_VERSION,
} from '@repo/config';

describe('@repo/config imports from @repo/server', () => {
  it('can import ok/fail constructors', () => {
    expect(ok({ test: true })).toEqual({ ok: true, data: { test: true } });
    expect(fail(ErrorCode.NOT_FOUND, 'missing')).toEqual({
      ok: false,
      error: { code: 'NOT_FOUND', message: 'missing' },
    });
  });

  it('can import TaskSchema', () => {
    const result = TaskSchema.safeParse({
      id: 't1',
      title: 'Test',
      description: null,
      status: 'todo',
      priority: 'medium',
      tags: null,
      dueDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    expect(result.success).toBe(true);
  });

  it('can import constants', () => {
    expect(DEFAULT_SERVER_PORT).toBe(13001);
    expect(APP_NAME).toBe('ai-app-starter');
    expect(APP_VERSION).toBe('1.0.0');
  });
});
