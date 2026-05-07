import { z } from 'zod';
import { TaskSchema, CreateTaskInput, UpdateTaskInput, TaskListQuery } from '@repo/config';
import type { ContractEntry } from './types.js';

export const taskContract = {
  list: {
    method: 'GET',
    path: '/api/tasks',
    input: TaskListQuery,
    output: z.array(TaskSchema),
  } satisfies ContractEntry<unknown, unknown>,

  create: {
    method: 'POST',
    path: '/api/tasks',
    input: CreateTaskInput,
    output: TaskSchema,
  } satisfies ContractEntry<unknown, unknown>,

  getById: {
    method: 'GET',
    path: '/api/tasks/:id',
    input: z.object({ id: z.string() }),
    output: TaskSchema,
  } satisfies ContractEntry<unknown, unknown>,

  update: {
    method: 'PUT',
    path: '/api/tasks/:id',
    input: z.intersection(z.object({ id: z.string() }), UpdateTaskInput),
    output: TaskSchema,
  } satisfies ContractEntry<unknown, unknown>,

  delete: {
    method: 'DELETE',
    path: '/api/tasks/:id',
    input: z.object({ id: z.string() }),
    output: z.object({ deleted: z.boolean() }),
  } satisfies ContractEntry<unknown, unknown>,
};

export type TaskContract = typeof taskContract;
