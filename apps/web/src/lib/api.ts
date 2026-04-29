import type { HealthStatus, ApiSuccess } from '@repo/config';
import { apiClient } from './api-client.js';

export async function fetchHealth(): Promise<HealthStatus> {
  const response = await apiClient.get<ApiSuccess<HealthStatus>>('/api/health');
  return response.data.data;
}
