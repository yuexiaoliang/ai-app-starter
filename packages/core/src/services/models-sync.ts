import { eq } from 'drizzle-orm';
import type { DB } from '../db/index.js';
import { providers, models } from '../db/schema.js';

const API_URL = 'https://models.dev/api.json';
const SYNC_INTERVAL_MS = 1000 * 60 * 60; // 1 hour

export interface ModelsDevApiData {
  [providerId: string]: {
    id: string;
    name: string;
    npm?: string;
    api?: string;
    doc?: string;
    env: string[];
    models: {
      [modelId: string]: {
        id: string;
        name: string;
        family?: string;
        attachment?: boolean;
        reasoning?: boolean;
        tool_call?: boolean;
        temperature?: boolean;
        structured_output?: boolean;
        knowledge?: string;
        release_date?: string;
        last_updated?: string;
        modalities?: { input: string[]; output: string[] };
        open_weights?: boolean;
        cost?: {
          input?: number;
          output?: number;
          cache_read?: number;
          cache_write?: number;
        };
        limit?: {
          context?: number;
          output?: number;
          input?: number;
        };
      };
    };
  };
}

export async function fetchModelsDevData(): Promise<ModelsDevApiData> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch models.dev: ${response.status}`);
  }
  return response.json() as Promise<ModelsDevApiData>;
}

export async function syncModelsDevData(db: DB): Promise<{ providers: number; models: number }> {
  const data = await fetchModelsDevData();
  const now = new Date();

  const apiProviderIds = new Set(Object.keys(data));
  const apiModelIds = new Set<string>();

  let providerCount = 0;
  let modelCount = 0;

  db.transaction((tx) => {
    for (const [providerId, providerData] of Object.entries(data)) {
      const modelEntries = Object.entries(providerData.models);

      tx.insert(providers)
        .values({
          id: providerId,
          name: providerData.name,
          npm: providerData.npm ?? null,
          api: providerData.api ?? null,
          doc: providerData.doc ?? null,
          env: providerData.env,
          modelCount: modelEntries.length,
          syncedAt: now,
        })
        .onConflictDoUpdate({
          target: providers.id,
          set: {
            name: providerData.name,
            npm: providerData.npm ?? null,
            api: providerData.api ?? null,
            doc: providerData.doc ?? null,
            env: providerData.env,
            modelCount: modelEntries.length,
            syncedAt: now,
          },
        })
        .run();
      providerCount++;

      for (const [modelId, modelData] of modelEntries) {
        const fullId = `${providerId}:${modelId}`;
        apiModelIds.add(fullId);

        tx.insert(models)
          .values({
            id: fullId,
            providerId,
            modelId,
            name: modelData.name,
            family: modelData.family ?? null,
            toolCall: modelData.tool_call ?? false,
            attachment: modelData.attachment ?? false,
            reasoning: modelData.reasoning ?? false,
            temperature: modelData.temperature ?? true,
            structuredOutput: modelData.structured_output ?? false,
            knowledge: modelData.knowledge ?? null,
            releaseDate: modelData.release_date ?? null,
            lastUpdated: modelData.last_updated ?? null,
            modalities: modelData.modalities ? JSON.stringify(modelData.modalities) : null,
            openWeights: modelData.open_weights ?? false,
            costInput: modelData.cost?.input ?? null,
            costOutput: modelData.cost?.output ?? null,
            costCacheRead: modelData.cost?.cache_read ?? null,
            costCacheWrite: modelData.cost?.cache_write ?? null,
            contextLimit: modelData.limit?.context ?? null,
            outputLimit: modelData.limit?.output ?? null,
            inputLimit: modelData.limit?.input ?? null,
          })
          .onConflictDoUpdate({
            target: models.id,
            set: {
              providerId,
              modelId,
              name: modelData.name,
              family: modelData.family ?? null,
              toolCall: modelData.tool_call ?? false,
              attachment: modelData.attachment ?? false,
              reasoning: modelData.reasoning ?? false,
              temperature: modelData.temperature ?? true,
              structuredOutput: modelData.structured_output ?? false,
              knowledge: modelData.knowledge ?? null,
              releaseDate: modelData.release_date ?? null,
              lastUpdated: modelData.last_updated ?? null,
              modalities: modelData.modalities ? JSON.stringify(modelData.modalities) : null,
              openWeights: modelData.open_weights ?? false,
              costInput: modelData.cost?.input ?? null,
              costOutput: modelData.cost?.output ?? null,
              costCacheRead: modelData.cost?.cache_read ?? null,
              costCacheWrite: modelData.cost?.cache_write ?? null,
              contextLimit: modelData.limit?.context ?? null,
              outputLimit: modelData.limit?.output ?? null,
              inputLimit: modelData.limit?.input ?? null,
            },
          })
          .run();
        modelCount++;
      }
    }

    // Clean up orphan records that no longer exist in the API response.
    const allDbModels = tx.select({ id: models.id }).from(models).all();
    for (const row of allDbModels) {
      if (!apiModelIds.has(row.id)) {
        tx.delete(models).where(eq(models.id, row.id)).run();
      }
    }

    const allDbProviders = tx.select({ id: providers.id }).from(providers).all();
    for (const row of allDbProviders) {
      if (!apiProviderIds.has(row.id)) {
        tx.delete(providers).where(eq(providers.id, row.id)).run();
      }
    }
  });

  return { providers: providerCount, models: modelCount };
}

export interface ModelsSyncOptions {
  intervalMs?: number;
  onError?: (err: unknown) => void;
}

/**
 * Start a periodic models.dev sync. Performs an immediate first sync, then
 * repeats on the configured interval. Returns a stop() function.
 *
 * Callers control when this runs (HTTP server bin, Electron main, tests).
 * It does not auto-start on import.
 */
export function startModelsSyncScheduler(db: DB, options: ModelsSyncOptions = {}): () => void {
  const intervalMs = options.intervalMs ?? SYNC_INTERVAL_MS;
  const onError =
    options.onError ??
    ((err: unknown) => {
      const message = err instanceof Error ? err.message : String(err);

      console.error('models.dev sync failed:', message);
    });

  syncModelsDevData(db).catch(onError);

  const interval = setInterval(() => {
    syncModelsDevData(db).catch(onError);
  }, intervalMs);

  return () => clearInterval(interval);
}
