import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { homedir } from 'node:os';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schemaModule from './schema.js';
import { APP_NAME } from '@repo/config';

export type DB = BetterSQLite3Database<typeof schemaModule>;

function resolveDbPath(url: string): string {
  if (url === ':memory:') {
    return ':memory:';
  }

  let path = url;

  if (path.startsWith('file:')) {
    path = path.slice(5);
  }

  if (path.startsWith('~/')) {
    path = path.replace('~', homedir());
  }

  return path;
}

export function createDb(url: string): { db: DB; sqlite: Database.Database } {
  const path = resolveDbPath(url);

  if (path !== ':memory:') {
    mkdirSync(dirname(path), { recursive: true });
  }

  const sqlite = new Database(path);
  const db = drizzle(sqlite, { schema: schemaModule });

  return { db, sqlite };
}

export const defaultDatabaseUrl = `file:${homedir()}/.${APP_NAME}/data/app.db`;

export const schema = schemaModule;
export { tasks, providers, models } from './schema.js';
