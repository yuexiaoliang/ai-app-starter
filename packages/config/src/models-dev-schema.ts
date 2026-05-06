import { z } from 'zod';

/**
 * Schema definitions for models.dev API data.
 * Based on https://models.dev/api.json
 */

export const ModalitySchema = z.object({
  input: z.array(z.string()),
  output: z.array(z.string()),
});
export type Modality = z.infer<typeof ModalitySchema>;

export const CostSchema = z.object({
  input: z.number().optional(),
  output: z.number().optional(),
  cache_read: z.number().optional(),
  cache_write: z.number().optional(),
  context_over_200k: z
    .object({
      input: z.number(),
      output: z.number(),
      cache_read: z.number().optional(),
      cache_write: z.number().optional(),
    })
    .optional(),
});
export type Cost = z.infer<typeof CostSchema>;

export const LimitSchema = z.object({
  context: z.number().optional(),
  output: z.number().optional(),
  input: z.number().optional(),
});
export type Limit = z.infer<typeof LimitSchema>;

export const InterleavedSchema = z.object({
  field: z.string(),
});
export type Interleaved = z.infer<typeof InterleavedSchema>;

export const ModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  family: z.string().optional(),
  attachment: z.boolean().default(false),
  reasoning: z.boolean().default(false),
  tool_call: z.boolean().default(false),
  temperature: z.boolean().default(true),
  structured_output: z.boolean().default(false),
  knowledge: z.string().optional(),
  release_date: z.string().optional(),
  last_updated: z.string().optional(),
  modalities: ModalitySchema,
  open_weights: z.boolean().default(false),
  cost: CostSchema.optional(),
  limit: LimitSchema.optional(),
  interleaved: InterleavedSchema.optional(),
});
export type Model = z.infer<typeof ModelSchema>;

export const ProviderSchema = z.object({
  id: z.string(),
  env: z.array(z.string()),
  npm: z.string().optional(),
  api: z.string().optional(),
  name: z.string(),
  doc: z.string().optional(),
  models: z.record(z.string(), ModelSchema),
});
export type Provider = z.infer<typeof ProviderSchema>;

export const ModelsDevApiSchema = z.record(z.string(), ProviderSchema);
export type ModelsDevApiData = z.infer<typeof ModelsDevApiSchema>;

/**
 * Flattened model entry for easy querying.
 */
export interface ModelEntry {
  providerId: string;
  providerName: string;
  providerNpm: string | undefined;
  providerApi: string | undefined;
  providerEnv: string[];
  modelId: string;
  model: Model;
}

/**
 * Filter criteria for model search.
 */
export interface ModelFilter {
  query?: string;
  provider?: string;
  family?: string;
  toolCall?: boolean;
  vision?: boolean;
  reasoning?: boolean;
  openWeights?: boolean;
  minContextWindow?: number;
  maxInputPrice?: number;
  maxOutputPrice?: number;
  modalities?: string[];
}

/**
 * Sort options for model list.
 */
export type ModelSortField =
  | 'name'
  | 'provider'
  | 'inputPrice'
  | 'outputPrice'
  | 'contextWindow'
  | 'releaseDate';

export type ModelSortDirection = 'asc' | 'desc';

export interface ModelSort {
  field: ModelSortField;
  direction: ModelSortDirection;
}
