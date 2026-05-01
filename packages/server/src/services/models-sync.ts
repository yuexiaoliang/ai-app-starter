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

  let providerCount = 0;
  let modelCount = 0;

  db.transaction((tx) => {
    // Clear existing data
    tx.delete(models).run();
    tx.delete(providers).run();

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
        .run();
      providerCount++;

      for (const [modelId, modelData] of modelEntries) {
        tx.insert(models)
          .values({
            id: `${providerId}:${modelId}`,
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
          .run();
        modelCount++;
      }
    }
  });

  return { providers: providerCount, models: modelCount };
}

export function startModelsSyncScheduler(db: DB): () => void {
  // Immediate first sync
  syncModelsDevData(db).catch((err) => {
    console.error('Initial models.dev sync failed:', err);
  });

  // Scheduled sync
  const interval = setInterval(() => {
    syncModelsDevData(db).catch((err) => {
      console.error('Scheduled models.dev sync failed:', err);
    });
  }, SYNC_INTERVAL_MS);

  return () => clearInterval(interval);
}
