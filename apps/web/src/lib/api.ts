import type { HealthStatus, ApiSuccess } from '@repo/config';
import { apiClient } from './api-client.js';

export async function fetchHealth(): Promise<HealthStatus> {
  const response = await apiClient.get<ApiSuccess<HealthStatus>>('/api/health');
  return response.data.data;
}

export interface ProviderListItem {
  id: string;
  name: string;
  npm: string | null;
  api: string | null;
  doc: string | null;
  env: string[] | null;
  modelCount: number;
  syncedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ProviderListQuery {
  query?: string;
  sortBy?: 'name' | 'modelCount';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export async function fetchProviders(
  query: ProviderListQuery = {}
): Promise<PaginatedResponse<ProviderListItem>> {
  const response = await apiClient.get<ApiSuccess<PaginatedResponse<ProviderListItem>>>(
    '/api/providers',
    {
      params: query,
    }
  );
  return response.data.data;
}

export interface ModelItem {
  id: string;
  providerId: string;
  modelId: string;
  name: string;
  family: string | null;
  toolCall: boolean;
  attachment: boolean;
  reasoning: boolean;
  temperature: boolean;
  structuredOutput: boolean;
  knowledge: string | null;
  releaseDate: string | null;
  lastUpdated: string | null;
  modalities: string | null;
  openWeights: boolean;
  costInput: number | null;
  costOutput: number | null;
  costCacheRead: number | null;
  costCacheWrite: number | null;
  contextLimit: number | null;
  outputLimit: number | null;
  inputLimit: number | null;
}

export async function fetchProviderModels(
  providerId: string,
  page = 1,
  pageSize = 20,
  query?: string
): Promise<PaginatedResponse<ModelItem>> {
  const response = await apiClient.get<ApiSuccess<PaginatedResponse<ModelItem>>>(
    `/api/providers/${providerId}/models`,
    { params: { page, pageSize, query } }
  );
  return response.data.data;
}
