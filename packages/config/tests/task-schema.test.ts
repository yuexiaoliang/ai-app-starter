import { describe, it, expect } from 'vitest';
import {
  TaskSchema,
  CreateTaskInput,
  UpdateTaskInput,
  TaskStatus,
  TaskPriority,
} from '../src/task-schema.js';

describe('TaskSchema', () => {
  const baseTask = {
    id: 'task_123',
    title: 'Test task',
    description: null,
    status: 'todo',
    priority: 'medium',
    tags: null,
    dueDate: null,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  };

  it('parses a valid task', () => {
    const result = TaskSchema.safeParse(baseTask);
    expect(result.success).toBe(true);
  });

  it('fails on empty title', () => {
    const result = TaskSchema.safeParse({ ...baseTask, title: '' });
    expect(result.success).toBe(false);
  });

  it('fails on invalid status', () => {
    const result = TaskSchema.safeParse({ ...baseTask, status: 'invalid_status' });
    expect(result.success).toBe(false);
  });

  it('fails on invalid priority', () => {
    const result = TaskSchema.safeParse({ ...baseTask, priority: 'urgent' });
    expect(result.success).toBe(false);
  });

  it('applies default status as todo', () => {
    const input = { ...baseTask };
    delete (input as Record<string, unknown>).status;
    const result = TaskSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe('todo');
    }
  });

  it('applies default priority as medium', () => {
    const input = { ...baseTask };
    delete (input as Record<string, unknown>).priority;
    const result = TaskSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.priority).toBe('medium');
    }
  });
});

describe('CreateTaskInput', () => {
  it('parses valid create input without id and timestamps', () => {
    const result = CreateTaskInput.safeParse({
      title: 'New task',
      description: 'A description',
      status: 'in_progress',
      priority: 'high',
      tags: ['tag1', 'tag2'],
      dueDate: new Date('2025-12-31'),
    });
    expect(result.success).toBe(true);
  });

  it('fails when title is empty', () => {
    const result = CreateTaskInput.safeParse({
      title: '',
      description: null,
    });
    expect(result.success).toBe(false);
  });
});

describe('UpdateTaskInput', () => {
  it('parses partial update', () => {
    const result = UpdateTaskInput.safeParse({
      title: 'Updated title',
    });
    expect(result.success).toBe(true);
  });

  it('allows empty partial update', () => {
    const result = UpdateTaskInput.safeParse({});
    expect(result.success).toBe(true);
  });
});

describe('TaskStatus', () => {
  it('accepts valid statuses', () => {
    expect(TaskStatus.safeParse('todo').success).toBe(true);
    expect(TaskStatus.safeParse('in_progress').success).toBe(true);
    expect(TaskStatus.safeParse('done').success).toBe(true);
  });

  it('rejects invalid status', () => {
    expect(TaskStatus.safeParse('archived').success).toBe(false);
  });
});

describe('TaskPriority', () => {
  it('accepts valid priorities', () => {
    expect(TaskPriority.safeParse('low').success).toBe(true);
    expect(TaskPriority.safeParse('medium').success).toBe(true);
    expect(TaskPriority.safeParse('high').success).toBe(true);
  });

  it('rejects invalid priority', () => {
    expect(TaskPriority.safeParse('critical').success).toBe(false);
  });
});
