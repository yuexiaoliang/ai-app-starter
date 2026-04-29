import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname } from 'node:path';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { DEFAULT_SERVER_PORT, APP_NAME } from '@repo/config';

export const EnvSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(DEFAULT_SERVER_PORT),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().default(`file:${homedir()}/.${APP_NAME}/data/app.db`),
  API_KEY: z.string().optional(),
  CORS_ORIGINS: z.string().optional(),
  RATE_LIMIT_ENABLED: z
    .string()
    .transform((v) => v === 'true')
    .default('false'),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
});

export type Env = z.infer<typeof EnvSchema>;

export const env: Env = EnvSchema.parse(process.env);

const apiKeyFile = `${homedir()}/.${APP_NAME}/.api-key`;

export function getResolvedApiKey(): string {
  if (env.API_KEY) {
    return env.API_KEY;
  }

  if (existsSync(apiKeyFile)) {
    return readFileSync(apiKeyFile, 'utf-8').trim();
  }

  const key = `sk-${nanoid(12)}`;
  mkdirSync(dirname(apiKeyFile), { recursive: true });
  writeFileSync(apiKeyFile, key, 'utf-8');
  return key;
}

export function getCorsOrigins(): string[] {
  if (env.NODE_ENV !== 'production') {
    return [];
  }

  if (!env.CORS_ORIGINS) {
    return [];
  }

  return env.CORS_ORIGINS.split(',')
    .map((o) => o.trim())
    .filter(Boolean);
}
