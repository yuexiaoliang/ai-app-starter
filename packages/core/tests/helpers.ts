import { createDb } from '../src/db/index.js';

export function createTestDb() {
  const result = createDb(':memory:');

  result.sqlite.exec(`
    CREATE TABLE tasks (
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

    CREATE TABLE providers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      npm TEXT,
      api TEXT,
      doc TEXT,
      env TEXT,
      model_count INTEGER NOT NULL DEFAULT 0,
      synced_at INTEGER NOT NULL
    );

    CREATE TABLE models (
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

  return result;
}
