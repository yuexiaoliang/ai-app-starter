import axios, { AxiosError, type AxiosInstance } from 'axios';
import { DEFAULT_API_BASE_URL, ErrorCode, type ApiResponse } from '@repo/config';

class ApiClientError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

function getBaseUrl(): string {
  return localStorage.getItem('api-base-url') || DEFAULT_API_BASE_URL;
}

export function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: getBaseUrl(),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use((config) => {
    // Dynamically update baseURL from localStorage on each request
    config.baseURL = getBaseUrl();

    const apiKey = localStorage.getItem('api-key');
    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => {
      const data = response.data as ApiResponse<unknown>;
      if (data && typeof data === 'object' && 'ok' in data && data.ok === false) {
        const error = data.error;
        throw new ApiClientError(error.message, error.code);
      }
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        const data = error.response.data as ApiResponse<unknown> | undefined;
        if (data && typeof data === 'object' && 'ok' in data && data.ok === false) {
          const err = data.error;
          throw new ApiClientError(err.message, err.code);
        }
        throw new ApiClientError(
          `Server error: ${error.response.status}`,
          ErrorCode.INTERNAL_ERROR
        );
      }
      if (error.request) {
        throw new ApiClientError(
          'Network error: unable to reach the server',
          ErrorCode.INTERNAL_ERROR
        );
      }
      throw new ApiClientError(error.message, ErrorCode.INTERNAL_ERROR);
    }
  );

  return client;
}

export const apiClient = createApiClient();

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

// API Key auto-acquisition on module load
(function acquireApiKey() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get('api-key');
  if (key) {
    localStorage.setItem('api-key', key);
    const url = new URL(window.location.href);
    url.searchParams.delete('api-key');
    window.history.replaceState({}, '', url.toString());
  }
})();
