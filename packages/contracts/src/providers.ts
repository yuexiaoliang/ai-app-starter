import { z } from 'zod';
import type { ContractEntry } from './types.js';

export const ProviderRowSchema = z.object({
  id: z.string(),
  name: z.string(),
  npm: z.string().nullable(),
  api: z.string().nullable(),
  doc: z.string().nullable(),
  env: z.array(z.string()).nullable(),
  modelCount: z.number(),
  syncedAt: z.date(),
});

export type ProviderRow = z.infer<typeof ProviderRowSchema>;

export const ModelRowSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  modelId: z.string(),
  name: z.string(),
  family: z.string().nullable(),
  toolCall: z.boolean(),
  attachment: z.boolean(),
  reasoning: z.boolean(),
  temperature: z.boolean(),
  structuredOutput: z.boolean(),
  knowledge: z.string().nullable(),
  releaseDate: z.string().nullable(),
  lastUpdated: z.string().nullable(),
  modalities: z.string().nullable(),
  openWeights: z.boolean(),
  costInput: z.number().nullable(),
  costOutput: z.number().nullable(),
  costCacheRead: z.number().nullable(),
  costCacheWrite: z.number().nullable(),
  contextLimit: z.number().nullable(),
  outputLimit: z.number().nullable(),
  inputLimit: z.number().nullable(),
});

export type ModelRow = z.infer<typeof ModelRowSchema>;

export function PaginatedResultSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    items: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
  });
}

export const ListProvidersQuery = z.object({
  query: z.string().optional(),
  sortBy: z.enum(['name', 'modelCount']).optional().default('name'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  page: z.coerce.number().min(1).optional().default(1),
  pageSize: z.coerce.number().min(1).max(100).optional().default(20),
});

export const ListModelsQuery = z.object({
  query: z.string().optional(),
  page: z.coerce.number().min(1).optional().default(1),
  pageSize: z.coerce.number().min(1).max(100).optional().default(20),
});

export const providerContract = {
  list: {
    method: 'GET',
    path: '/api/providers',
    input: ListProvidersQuery,
    output: PaginatedResultSchema(ProviderRowSchema),
  } satisfies ContractEntry<unknown, unknown>,

  getById: {
    method: 'GET',
    path: '/api/providers/:id',
    input: z.object({ id: z.string() }),
    output: ProviderRowSchema,
  } satisfies ContractEntry<unknown, unknown>,

  listModels: {
    method: 'GET',
    path: '/api/providers/:id/models',
    input: z.intersection(z.object({ id: z.string() }), ListModelsQuery),
    output: PaginatedResultSchema(ModelRowSchema),
  } satisfies ContractEntry<unknown, unknown>,
};

export type ProviderContract = typeof providerContract;
