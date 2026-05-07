import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createTestDb } from '../helpers.js';
import { createApp } from '../../src/app.js';
import { env, getResolvedApiKey } from '../../src/env.js';
import { ErrorCode } from '@repo/config';

describe('API Key middleware', () => {
  const originalApiKey = env.API_KEY;

  beforeEach(() => {
    env.API_KEY = undefined;
  });

  afterEach(() => {
    env.API_KEY = originalApiKey;
  });

  it('allows all requests when API_KEY is not set', async () => {
    const { db, sqlite } = createTestDb();
    const app = createApp(db);

    const res = await app.request('/api/tasks', {
      method: 'GET',
    });

    expect(res.status).toBe(200);

    sqlite.close();
  });

  it('rejects requests without key when API_KEY is set', async () => {
    env.API_KEY = 'test-secret-key';
    const { db, sqlite } = createTestDb();
    const app = createApp(db);

    const res = await app.request('/api/tasks', {
      method: 'GET',
    });

    expect(res.status).toBe(401);
    const body = (await res.json()) as { ok: boolean; error: { code: string } };
    expect(body.ok).toBe(false);
    expect(body.error.code).toBe(ErrorCode.UNAUTHORIZED);

    sqlite.close();
  });

  it('rejects requests with wrong key', async () => {
    env.API_KEY = 'test-secret-key';
    const { db, sqlite } = createTestDb();
    const app = createApp(db);

    const res = await app.request('/api/tasks', {
      method: 'GET',
      headers: { 'x-api-key': 'wrong-key' },
    });

    expect(res.status).toBe(401);
    const body = (await res.json()) as { ok: boolean; error: { code: string } };
    expect(body.ok).toBe(false);
    expect(body.error.code).toBe(ErrorCode.UNAUTHORIZED);

    sqlite.close();
  });

  it('allows requests with correct key', async () => {
    env.API_KEY = 'test-secret-key';
    const { db, sqlite } = createTestDb();
    const app = createApp(db);

    const res = await app.request('/api/tasks', {
      method: 'GET',
      headers: { 'x-api-key': 'test-secret-key' },
    });

    expect(res.status).toBe(200);

    sqlite.close();
  });

  it('exempts /api/health when API_KEY is set', async () => {
    env.API_KEY = 'test-secret-key';
    const { db, sqlite } = createTestDb();
    const app = createApp(db);

    const res = await app.request('/api/health');

    expect(res.status).toBe(200);

    sqlite.close();
  });

  it('exempts /api/health when API_KEY is not set', async () => {
    const { db, sqlite } = createTestDb();
    const app = createApp(db);

    const res = await app.request('/api/health');

    expect(res.status).toBe(200);

    sqlite.close();
  });

  it('uses getResolvedApiKey when API_KEY matches file content', async () => {
    // This test verifies that the resolved key mechanism works
    const key = getResolvedApiKey();
    env.API_KEY = key;
    const { db, sqlite } = createTestDb();
    const app = createApp(db);

    const res = await app.request('/api/tasks', {
      method: 'GET',
      headers: { 'x-api-key': key },
    });

    expect(res.status).toBe(200);

    sqlite.close();
  });
});
