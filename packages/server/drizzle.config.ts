import { defineConfig } from 'drizzle-kit';
import { defaultDatabaseUrl } from '@repo/core/db';

export default defineConfig({
  schema: '../core/src/db/schema.ts',
  dialect: 'sqlite',
  out: './migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL || defaultDatabaseUrl,
  },
});
