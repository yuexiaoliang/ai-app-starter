import { defineConfig } from 'drizzle-kit';
import { defaultDatabaseUrl } from './src/db/index.js';

export default defineConfig({
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL || defaultDatabaseUrl,
  },
});
