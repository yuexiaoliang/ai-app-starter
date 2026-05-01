import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status', { enum: ['todo', 'in_progress', 'done'] })
    .notNull()
    .default('todo'),
  priority: text('priority', { enum: ['low', 'medium', 'high'] })
    .notNull()
    .default('medium'),
  tags: text('tags', { mode: 'json' }).$type<string[]>(),
  dueDate: integer('due_date', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const providers = sqliteTable('providers', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  npm: text('npm'),
  api: text('api'),
  doc: text('doc'),
  env: text('env', { mode: 'json' }).$type<string[]>(),
  modelCount: integer('model_count').notNull().default(0),
  syncedAt: integer('synced_at', { mode: 'timestamp' }).notNull(),
});

export const models = sqliteTable('models', {
  id: text('id').primaryKey(),
  providerId: text('provider_id').notNull(),
  modelId: text('model_id').notNull(),
  name: text('name').notNull(),
  family: text('family'),
  toolCall: integer('tool_call', { mode: 'boolean' }).notNull().default(false),
  attachment: integer('attachment', { mode: 'boolean' }).notNull().default(false),
  reasoning: integer('reasoning', { mode: 'boolean' }).notNull().default(false),
  temperature: integer('temperature', { mode: 'boolean' }).notNull().default(true),
  structuredOutput: integer('structured_output', { mode: 'boolean' }).notNull().default(false),
  knowledge: text('knowledge'),
  releaseDate: text('release_date'),
  lastUpdated: text('last_updated'),
  modalities: text('modalities', { mode: 'json' }),
  openWeights: integer('open_weights', { mode: 'boolean' }).notNull().default(false),
  costInput: real('cost_input'),
  costOutput: real('cost_output'),
  costCacheRead: real('cost_cache_read'),
  costCacheWrite: real('cost_cache_write'),
  contextLimit: integer('context_limit'),
  outputLimit: integer('output_limit'),
  inputLimit: integer('input_limit'),
});
