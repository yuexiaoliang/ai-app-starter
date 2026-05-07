import axios from 'axios';
import { createClient, taskContract, providerContract } from '@repo/contracts';
import type { ProviderRow, ModelRow } from '@repo/contracts';
import { DEFAULT_API_BASE_URL } from '@repo/config';
import type { HealthStatus } from '@repo/config';
import { getTransport } from '@/transport/index.js';

export const taskClient = createClient(taskContract, getTransport(), 'tasks');
export const providerClient = createClient(providerContract, getTransport(), 'providers');

// Re-export contract types for convenience
export type { Task, CreateTaskInput, UpdateTaskInput, TaskListQuery } from '@repo/config';
export type ProviderListItem = ProviderRow;
export type ModelItem = ModelRow;

// Health endpoint is not part of any contract; kept as a lightweight helper.
export async function fetchHealth(): Promise<HealthStatus> {
  const baseURL = localStorage.getItem('api-base-url') || DEFAULT_API_BASE_URL;
  const apiKey = localStorage.getItem('api-key');
  type HealthResponse = { data: HealthStatus } | { ok: false; error: { message?: string } };
  const res = await axios.get<HealthResponse>(`${baseURL}/api/health`, {
    headers: apiKey ? { 'x-api-key': apiKey } : undefined,
  });
  const data = res.data;
  if ('ok' in data && data.ok === false) {
    throw new Error(data.error.message || 'Health check failed');
  }
  return (data as { data: HealthStatus }).data;
}
