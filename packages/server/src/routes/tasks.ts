import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import type { ZodSchema } from 'zod';
import type { Context } from 'hono';
import { CreateTaskInput, UpdateTaskInput, TaskListQuery, ok, fail, ErrorCode } from '@repo/config';
import type { DB } from '../db/index.js';
import { TaskRepository } from '../repositories/task.repository.js';

function honoValidator<T extends ZodSchema>(target: 'json' | 'query', schema: T) {
  return zValidator(target, schema, (result, c: Context): Response | void => {
    if (!result.success) {
      return c.json(
        fail(ErrorCode.VALIDATION_FAILED, 'Validation failed', result.error.issues),
        400
      );
    }
  });
}

function getTaskId(c: Context): string | null {
  const id = c.req.param('id');
  return id ?? null;
}

export function createTaskRoutes(db: DB) {
  const app = new Hono();
  const repo = new TaskRepository(db);

  app.get('/api/tasks', honoValidator('query', TaskListQuery), async (c) => {
    const query = c.req.valid('query');
    const tasks = await repo.findAll(query.status ? { status: query.status } : undefined);
    return c.json(ok(tasks));
  });

  app.post('/api/tasks', honoValidator('json', CreateTaskInput), async (c) => {
    const input = c.req.valid('json');
    const task = await repo.create(input);
    return c.json(ok(task), 201);
  });

  app.get('/api/tasks/:id', async (c) => {
    const id = getTaskId(c);
    if (!id) {
      return c.json(fail(ErrorCode.NOT_FOUND, 'Task not found'), 404);
    }
    const task = await repo.findById(id);
    if (!task) {
      return c.json(fail(ErrorCode.NOT_FOUND, `Task ${id} not found`), 404);
    }
    return c.json(ok(task));
  });

  app.put('/api/tasks/:id', honoValidator('json', UpdateTaskInput), async (c) => {
    const id = getTaskId(c);
    if (!id) {
      return c.json(fail(ErrorCode.NOT_FOUND, 'Task not found'), 404);
    }
    const input = c.req.valid('json');
    const task = await repo.update(id, input);
    if (!task) {
      return c.json(fail(ErrorCode.NOT_FOUND, `Task ${id} not found`), 404);
    }
    return c.json(ok(task));
  });

  app.delete('/api/tasks/:id', async (c) => {
    const id = getTaskId(c);
    if (!id) {
      return c.json(fail(ErrorCode.NOT_FOUND, 'Task not found'), 404);
    }
    const deleted = await repo.delete(id);
    if (!deleted) {
      return c.json(fail(ErrorCode.NOT_FOUND, `Task ${id} not found`), 404);
    }
    return c.json(ok({ deleted: true }));
  });

  return app;
}
