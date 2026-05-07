import axios, { AxiosError } from 'axios';
import type { Transport, TransportRequest, TransportResponse } from './types.js';
import { ErrorCode, type ApiResponse } from '@repo/config';

export function createHttpTransport(baseURL: string): Transport {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use((config) => {
    config.baseURL = baseURL;
    const apiKey = localStorage.getItem('api-key');
    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }
    return config;
  });

  return {
    async request<T>(req: TransportRequest): Promise<TransportResponse<T>> {
      try {
        const res = await client.request<ApiResponse<T>>({
          method: req.method,
          url: req.url,
          params: req.params,
          data: req.body,
        });
        return { data: res.data as T, status: res.status };
      } catch (err) {
        if (err instanceof AxiosError && err.response) {
          const data = err.response.data as ApiResponse<unknown> | undefined;
          if (data && typeof data === 'object' && 'ok' in data && data.ok === false) {
            const e = data.error;
            throw new ApiClientError(e.message, e.code);
          }
          throw new ApiClientError(
            `Server error: ${err.response.status}`,
            ErrorCode.INTERNAL_ERROR
          );
        }
        if (err instanceof AxiosError && err.request) {
          throw new ApiClientError(
            'Network error: unable to reach the server',
            ErrorCode.INTERNAL_ERROR
          );
        }
        throw err;
      }
    },
  };
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

export function isApiClientError(error: unknown): error is ApiClientError {
  return error instanceof ApiClientError;
}

export function getApiClientErrorMessage(error: unknown): string {
  if (isApiClientError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}

export function getApiClientErrorCode(error: unknown): string | undefined {
  if (isApiClientError(error)) {
    return error.code;
  }
  return undefined;
}
