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

const DateInput: z.ZodType<Date | null, z.ZodTypeDef, unknown> = z.preprocess(
  (val) => {
    if (val === undefined || val === null) return null;
    return val;
  },
  z.union([z.coerce.date(), z.literal(null)])
);

export const CreateTaskInput = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  status: TaskStatus.default('todo').optional(),
  priority: TaskPriority.default('medium').optional(),
  tags: z.array(z.string()).nullable().optional(),
  dueDate: DateInput.optional(),
});
export type CreateTaskInput = z.infer<typeof CreateTaskInput>;

export const UpdateTaskInput = z.object({
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  status: TaskStatus.optional(),
  priority: TaskPriority.optional(),
  tags: z.array(z.string()).nullable().optional(),
  dueDate: DateInput.optional(),
});
export type UpdateTaskInput = z.infer<typeof UpdateTaskInput>;

export const TaskListQuery = z.object({
  status: TaskStatus.optional(),
});
export type TaskListQuery = z.infer<typeof TaskListQuery>;
