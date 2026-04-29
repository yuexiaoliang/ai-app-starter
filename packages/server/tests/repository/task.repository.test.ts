import { describe, it, expect, beforeEach } from 'vitest';
import { createTestDb } from '../helpers.js';
import { TaskRepository } from '../../src/repositories/task.repository.js';
import type { CreateTaskInput } from '@repo/config';

describe('TaskRepository', () => {
  function setup() {
    const { db, sqlite } = createTestDb();
    const repo = new TaskRepository(db);
    return { repo, sqlite };
  }

  beforeEach(() => {
    // Each test creates its own DB via setup(), so no shared state
  });

  it('creates a task', async () => {
    const { repo, sqlite } = setup();
    const input: CreateTaskInput = {
      title: 'Test task',
    };

    const task = await repo.create(input);

    expect(task.id).toBeDefined();
    expect(task.title).toBe('Test task');
    expect(task.status).toBe('todo');
    expect(task.priority).toBe('medium');
    expect(task.createdAt).toBeInstanceOf(Date);
    expect(task.updatedAt).toBeInstanceOf(Date);

    sqlite.close();
  });

  it('finds all tasks', async () => {
    const { repo, sqlite } = setup();
    await repo.create({ title: 'Task 1' });
    await repo.create({ title: 'Task 2' });

    const tasks = await repo.findAll();

    expect(tasks).toHaveLength(2);

    sqlite.close();
  });

  it('filters tasks by status', async () => {
    const { repo, sqlite } = setup();
    await repo.create({ title: 'Todo task', status: 'todo' });
    await repo.create({ title: 'Done task', status: 'done' });

    const todoTasks = await repo.findAll({ status: 'todo' });

    expect(todoTasks).toHaveLength(1);
    expect(todoTasks[0].status).toBe('todo');

    sqlite.close();
  });

  it('finds a task by id', async () => {
    const { repo, sqlite } = setup();
    const created = await repo.create({ title: 'Find me' });

    const found = await repo.findById(created.id);

    expect(found).not.toBeNull();
    expect(found?.title).toBe('Find me');

    sqlite.close();
  });

  it('returns null for non-existent id', async () => {
    const { repo, sqlite } = setup();

    const found = await repo.findById('non-existent-id');

    expect(found).toBeNull();

    sqlite.close();
  });

  it('updates a task', async () => {
    const { repo, sqlite } = setup();
    const created = await repo.create({ title: 'Original' });

    const updated = await repo.update(created.id, { title: 'Updated' });

    expect(updated).not.toBeNull();
    expect(updated?.title).toBe('Updated');
    expect(updated?.id).toBe(created.id);

    sqlite.close();
  });

  it('returns null when updating non-existent task', async () => {
    const { repo, sqlite } = setup();

    const updated = await repo.update('non-existent', { title: 'Updated' });

    expect(updated).toBeNull();

    sqlite.close();
  });

  it('deletes a task', async () => {
    const { repo, sqlite } = setup();
    const created = await repo.create({ title: 'Delete me' });

    const deleted = await repo.delete(created.id);

    expect(deleted).toBe(true);
    expect(await repo.findById(created.id)).toBeNull();

    sqlite.close();
  });

  it('returns false when deleting non-existent task', async () => {
    const { repo, sqlite } = setup();

    const deleted = await repo.delete('non-existent');

    expect(deleted).toBe(false);

    sqlite.close();
  });
});
