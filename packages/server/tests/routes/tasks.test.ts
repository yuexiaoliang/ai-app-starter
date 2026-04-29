import { describe, it, expect, beforeEach } from 'vitest';
import { createTestDb } from '../helpers.js';
import { createApp } from '../../src/app.js';
import { ErrorCode } from '@repo/config';

interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: { code: string; message: string };
}

describe('Task routes', () => {
  function setup() {
    const { db, sqlite } = createTestDb();
    const app = createApp(db);
    return { app, sqlite };
  }

  beforeEach(() => {
    // Tests create fresh DB instances
  });

  describe('POST /api/tasks', () => {
    it('creates a task successfully', async () => {
      const { app, sqlite } = setup();

      const res = await app.request('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New task' }),
      });

      expect(res.status).toBe(201);
      const body = (await res.json()) as ApiResponse<{ title: string; status: string }>;
      expect(body.ok).toBe(true);
      expect(body.data?.title).toBe('New task');
      expect(body.data?.status).toBe('todo');

      sqlite.close();
    });

    it('returns VALIDATION_FAILED for empty title', async () => {
      const { app, sqlite } = setup();

      const res = await app.request('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: '' }),
      });

      expect(res.status).toBe(400);
      const body = (await res.json()) as ApiResponse<never>;
      expect(body.ok).toBe(false);
      expect(body.error?.code).toBe(ErrorCode.VALIDATION_FAILED);

      sqlite.close();
    });
  });

  describe('GET /api/tasks', () => {
    it('lists all tasks', async () => {
      const { app, sqlite } = setup();

      await app.request('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Task 1' }),
      });

      const res = await app.request('/api/tasks');
      expect(res.status).toBe(200);
      const body = (await res.json()) as ApiResponse<unknown[]>;
      expect(body.ok).toBe(true);
      expect(body.data).toHaveLength(1);

      sqlite.close();
    });

    it('filters by status', async () => {
      const { app, sqlite } = setup();

      await app.request('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Todo', status: 'todo' }),
      });
      await app.request('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Done', status: 'done' }),
      });

      const res = await app.request('/api/tasks?status=todo');
      expect(res.status).toBe(200);
      const body = (await res.json()) as ApiResponse<Array<{ status: string }>>;
      expect(body.data).toHaveLength(1);
      expect(body.data?.[0].status).toBe('todo');

      sqlite.close();
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('returns a task by id', async () => {
      const { app, sqlite } = setup();

      const createRes = await app.request('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Find me' }),
      });
      const created = (await createRes.json()) as ApiResponse<{ id: string }>;

      const res = await app.request(`/api/tasks/${created.data?.id}`);
      expect(res.status).toBe(200);
      const body = (await res.json()) as ApiResponse<{ title: string }>;
      expect(body.data?.title).toBe('Find me');

      sqlite.close();
    });

    it('returns 404 for non-existent id', async () => {
      const { app, sqlite } = setup();

      const res = await app.request('/api/tasks/non-existent');
      expect(res.status).toBe(404);
      const body = (await res.json()) as ApiResponse<never>;
      expect(body.ok).toBe(false);
      expect(body.error?.code).toBe(ErrorCode.NOT_FOUND);

      sqlite.close();
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('updates a task', async () => {
      const { app, sqlite } = setup();

      const createRes = await app.request('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Original' }),
      });
      const created = (await createRes.json()) as ApiResponse<{ id: string }>;

      const res = await app.request(`/api/tasks/${created.data?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Updated' }),
      });

      expect(res.status).toBe(200);
      const body = (await res.json()) as ApiResponse<{ title: string }>;
      expect(body.data?.title).toBe('Updated');

      sqlite.close();
    });

    it('returns 404 for non-existent id', async () => {
      const { app, sqlite } = setup();

      const res = await app.request('/api/tasks/non-existent', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Updated' }),
      });

      expect(res.status).toBe(404);
      const body = (await res.json()) as ApiResponse<never>;
      expect(body.error?.code).toBe(ErrorCode.NOT_FOUND);

      sqlite.close();
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('deletes a task', async () => {
      const { app, sqlite } = setup();

      const createRes = await app.request('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Delete me' }),
      });
      const created = (await createRes.json()) as ApiResponse<{ id: string }>;

      const res = await app.request(`/api/tasks/${created.data?.id}`, {
        method: 'DELETE',
      });

      expect(res.status).toBe(200);
      const body = (await res.json()) as ApiResponse<{ deleted: boolean }>;
      expect(body.data?.deleted).toBe(true);

      sqlite.close();
    });

    it('returns 404 for non-existent id', async () => {
      const { app, sqlite } = setup();

      const res = await app.request('/api/tasks/non-existent', {
        method: 'DELETE',
      });

      expect(res.status).toBe(404);
      const body = (await res.json()) as ApiResponse<never>;
      expect(body.error?.code).toBe(ErrorCode.NOT_FOUND);

      sqlite.close();
    });
  });
});
