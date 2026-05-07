import type { ApiResponse } from '@repo/config';
import { getTransport } from '@/transport/index.js';
import {
  ApiClientError,
  isApiClientError,
  getApiClientErrorMessage,
  getApiClientErrorCode,
} from '@/transport/http.js';

export async function apiRequest<T>(
  method: string,
  url: string,
  params?: unknown,
  body?: unknown
): Promise<T> {
  const transport = getTransport();
  const response = await transport.request<ApiResponse<T>>({
    method: method as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url,
    params,
    body,
  });

  const data = response.data;
  if (data && typeof data === 'object' && 'ok' in data && data.ok === false) {
    const error = (data as { error: { code: string; message: string } }).error;
    throw new ApiClientError(error.message, error.code);
  }

  return (data as { data: T }).data;
}

export { isApiClientError, getApiClientErrorMessage, getApiClientErrorCode };
