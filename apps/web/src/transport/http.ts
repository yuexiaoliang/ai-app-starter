import axios, { AxiosError } from 'axios';
import type { Transport } from '@repo/contracts';
import type { ContractEntry } from '@repo/contracts';
import { ErrorCode } from '@repo/config';

export function createHttpTransport(
  baseURL: string,
  entries: Map<string, ContractEntry<unknown, unknown>>
): Transport {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use((config) => {
    const apiKey = localStorage.getItem('api-key');
    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }
    return config;
  });

  return {
    async invoke<I, O>(channel: string, input: I): Promise<O> {
      const entry = entries.get(channel);
      if (!entry) {
        throw new ApiClientError(`Unknown channel: ${channel}`, ErrorCode.INTERNAL_ERROR);
      }

      const { method, path } = entry;
      const inputRecord = (input as Record<string, unknown> | undefined) || {};

      // Extract path params and substitute them into the URL.
      const pathParamNames = [...path.matchAll(/:([^/]+)/g)].map((m) => m[1]);
      let resolvedPath = path;
      const remaining: Record<string, unknown> = { ...inputRecord };

      for (const paramName of pathParamNames) {
        if (paramName in remaining) {
          resolvedPath = resolvedPath.replace(`:${paramName}`, String(remaining[paramName]));
          delete remaining[paramName];
        }
      }

      let params: Record<string, unknown> | undefined;
      let body: unknown;

      if (method === 'POST' || method === 'PUT') {
        body = remaining;
      } else {
        params = Object.fromEntries(
          Object.entries(remaining).filter(([, v]) => v !== undefined && v !== null)
        );
        if (Object.keys(params).length === 0) {
          params = undefined;
        }
      }

      try {
        type ApiEnvelope<O> = { data: O } | { ok: false; error: { code: string; message: string } };

        const res = await client.request<ApiEnvelope<O>>({
          method,
          url: resolvedPath,
          params,
          data: body,
        });

        const data = res.data;
        if (data && typeof data === 'object' && 'ok' in data && data.ok === false) {
          const e = (data as { error: { code: string; message: string } }).error;
          throw new ApiClientError(e.message, e.code);
        }

        return (data as { data: O }).data;
      } catch (err) {
        if (err instanceof ApiClientError) throw err;

        if (err instanceof AxiosError && err.response) {
          const data = err.response.data as
            | { ok: false; error: { code: string; message: string } }
            | undefined;
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
