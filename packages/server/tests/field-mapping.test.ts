import { describe, it, expect } from 'vitest';
import { getTableColumns } from 'drizzle-orm';
import { tasks } from '../src/db/schema.js';
import { TaskSchema } from '@repo/config';

describe('field mapping between TaskSchema and Drizzle schema', () => {
  it('has a Drizzle column for every TaskSchema key', () => {
    const drizzleColumns = getTableColumns(tasks);
    const zodKeys = Object.keys(TaskSchema.shape);

    for (const key of zodKeys) {
      expect(key in drizzleColumns, `Missing column for TaskSchema key: ${key}`).toBe(true);
    }
  });
});
