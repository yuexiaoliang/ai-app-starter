import { describe, it, expect } from 'vitest';
import { createTestDb } from '../helpers.js';
import { createApp } from '../../src/app.js';
import { APP_VERSION } from '@repo/config';

describe('GET /api/health', () => {
  it('returns health status envelope', async () => {
    const { db, sqlite } = createTestDb();
    const app = createApp(db);

    const res = await app.request('/api/health');
    expect(res.status).toBe(200);

    const body = (await res.json()) as {
      ok: boolean;
      data: { status: string; timestamp: string; version: string };
    };
    expect(body.ok).toBe(true);
    expect(body.data.status).toBe('ok');
    expect(body.data.version).toBe(APP_VERSION);
    expect(typeof body.data.timestamp).toBe('string');

    sqlite.close();
  });
});
