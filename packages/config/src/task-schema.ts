import { z } from 'zod';

export const TaskStatus = z.enum(['todo', 'in_progress', 'done']);
export type TaskStatus = z.infer<typeof TaskStatus>;

export const TaskPriority = z.enum(['low', 'medium', 'high']);
export type TaskPriority = z.infer<typeof TaskPriority>;

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().nullable(),
  status: TaskStatus.default('todo'),
  priority: TaskPriority.default('medium'),
  tags: z.array(z.string()).nullable(),
  dueDate: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Task = z.infer<typeof TaskSchema>;

export const CreateTaskInput = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateTaskInput = z.infer<typeof CreateTaskInput>;

export const UpdateTaskInput = TaskSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type UpdateTaskInput = z.infer<typeof UpdateTaskInput>;

export const TaskListQuery = z.object({
  status: TaskStatus.optional(),
});
export type TaskListQuery = z.infer<typeof TaskListQuery>;
