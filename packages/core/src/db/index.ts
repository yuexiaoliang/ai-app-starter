import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { homedir } from 'node:os';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
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

/**
 * Run Drizzle migrations against the given SQLite connection.
 */
export function runMigrations(sqlite: Database.Database, migrationsFolder: string): void {
  const db = drizzle(sqlite);
  migrate(db, { migrationsFolder });
}

/**
 * Ensures the database schema exists by running CREATE TABLE IF NOT EXISTS.
 * This is used in the Electron desktop main process where drizzle-kit push
 * is not available. Full Drizzle migrations can be adopted later.
 */
export function bootstrapDb(sqlite: Database.Database): void {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'todo',
      priority TEXT NOT NULL DEFAULT 'medium',
      tags TEXT,
      due_date INTEGER,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS providers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      npm TEXT,
      api TEXT,
      doc TEXT,
      env TEXT,
      model_count INTEGER NOT NULL DEFAULT 0,
      synced_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS models (
      id TEXT PRIMARY KEY,
      provider_id TEXT NOT NULL,
      model_id TEXT NOT NULL,
      name TEXT NOT NULL,
      family TEXT,
      tool_call INTEGER NOT NULL DEFAULT 0,
      attachment INTEGER NOT NULL DEFAULT 0,
      reasoning INTEGER NOT NULL DEFAULT 0,
      temperature INTEGER NOT NULL DEFAULT 1,
      structured_output INTEGER NOT NULL DEFAULT 0,
      knowledge TEXT,
      release_date TEXT,
      last_updated TEXT,
      modalities TEXT,
      open_weights INTEGER NOT NULL DEFAULT 0,
      cost_input REAL,
      cost_output REAL,
      cost_cache_read REAL,
      cost_cache_write REAL,
      context_limit INTEGER,
      output_limit INTEGER,
      input_limit INTEGER
    );
  `);
}
