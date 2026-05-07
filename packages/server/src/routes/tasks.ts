import { Hono } from 'hono';
import { ErrorCode } from '@repo/config';
import { taskContract, bindContractToHono, ContractError } from '@repo/contracts';
import type { DB } from '@repo/core/db';
import { TaskRepository } from '@repo/core/repositories';

export function createTaskHandlers(db: DB) {
  const repo = new TaskRepository(db);

  return {
    list: async (query: { status?: 'todo' | 'in_progress' | 'done' }) => {
      return repo.findAll(query.status ? { status: query.status } : undefined);
    },

    create: async (input: {
      title: string;
      description?: string | null;
      status?: 'todo' | 'in_progress' | 'done';
      priority?: 'low' | 'medium' | 'high';
      tags?: string[] | null;
      dueDate?: Date | null;
    }) => {
      return repo.create(input);
    },

    getById: async ({ id }: { id: string }) => {
      const task = await repo.findById(id);
      if (!task) {
        throw new ContractError(ErrorCode.NOT_FOUND, `Task ${id} not found`, 404);
      }
      return task;
    },

    update: async (input: {
      id: string;
      title?: string;
      description?: string | null;
      status?: 'todo' | 'in_progress' | 'done';
      priority?: 'low' | 'medium' | 'high';
      tags?: string[] | null;
      dueDate?: Date | null;
    }) => {
      const { id, ...updates } = input;
      const task = await repo.update(id, updates);
      if (!task) {
        throw new ContractError(ErrorCode.NOT_FOUND, `Task ${id} not found`, 404);
      }
      return task;
    },

    delete: async ({ id }: { id: string }) => {
      const deleted = await repo.delete(id);
      if (!deleted) {
        throw new ContractError(ErrorCode.NOT_FOUND, `Task ${id} not found`, 404);
      }
      return { deleted: true };
    },
  };
}

export function createTaskRoutes(db: DB) {
  const app = new Hono();
  const handlers = createTaskHandlers(db);
  bindContractToHono(app, taskContract, handlers);
  return app;
}
