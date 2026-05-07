import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import type { CreateTaskInput, UpdateTaskInput, Task } from '@repo/config';
import type { DB } from '../db/index.js';
import { tasks } from '../db/schema.js';

export class TaskRepository {
  constructor(private db: DB) {}

  async findAll(filter?: { status?: string }): Promise<Task[]> {
    const query = filter?.status
      ? this.db
          .select()
          .from(tasks)
          .where(eq(tasks.status, filter.status as 'todo' | 'in_progress' | 'done'))
      : this.db.select().from(tasks);

    const rows = query.all();

    return rows.map((row) => this.toTask(row));
  }

  async findById(id: string): Promise<Task | null> {
    const rows = this.db.select().from(tasks).where(eq(tasks.id, id)).all();
    if (rows.length === 0) {
      return null;
    }
    return this.toTask(rows[0]);
  }

  async create(input: CreateTaskInput): Promise<Task> {
    const now = new Date();
    const id = nanoid();

    const row = {
      id,
      title: input.title,
      description: input.description ?? null,
      status: input.status ?? 'todo',
      priority: input.priority ?? 'medium',
      tags: input.tags ?? null,
      dueDate: input.dueDate ?? null,
      createdAt: now,
      updatedAt: now,
    };

    this.db.insert(tasks).values(row).run();

    return this.toTask(row);
  }

  async update(id: string, input: UpdateTaskInput): Promise<Task | null> {
    const existing = await this.findById(id);
    if (!existing) {
      return null;
    }

    const updates: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (input.title !== undefined) updates.title = input.title;
    if (input.description !== undefined) updates.description = input.description;
    if (input.status !== undefined) updates.status = input.status;
    if (input.priority !== undefined) updates.priority = input.priority;
    if (input.tags !== undefined) updates.tags = input.tags;
    if (input.dueDate !== undefined) updates.dueDate = input.dueDate;

    this.db.update(tasks).set(updates).where(eq(tasks.id, id)).run();

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = this.db.delete(tasks).where(eq(tasks.id, id)).run();
    return result.changes > 0;
  }

  private toTask(row: Record<string, unknown>): Task {
    return {
      id: row.id as string,
      title: row.title as string,
      description: (row.description as string | null) ?? null,
      status: row.status as 'todo' | 'in_progress' | 'done',
      priority: row.priority as 'low' | 'medium' | 'high',
      tags: (row.tags as string[] | null) ?? null,
      dueDate: row.dueDate ? new Date(row.dueDate as number) : null,
      createdAt: new Date(row.createdAt as number),
      updatedAt: new Date(row.updatedAt as number),
    };
  }
}
