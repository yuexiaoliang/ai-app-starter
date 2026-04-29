/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DEFAULT_API_BASE_URL, ErrorCode } from '@repo/config';
import {
  createApiClient,
  isApiClientError,
  getApiClientErrorMessage,
  getApiClientErrorCode,
} from '@/lib/api-client.js';

describe('API Client', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('baseURL', () => {
    it('uses DEFAULT_API_BASE_URL when localStorage has no api-base-url', () => {
      const client = createApiClient();
      expect(client.defaults.baseURL).toBe(DEFAULT_API_BASE_URL);
    });

    it('reads baseURL from localStorage when present', () => {
      localStorage.setItem('api-base-url', 'http://custom:8080');
      const client = createApiClient();
      expect(client.defaults.baseURL).toBe('http://custom:8080');
    });
  });

  describe('request interceptor', () => {
    it('attaches x-api-key header when localStorage has api-key', () => {
      localStorage.setItem('api-key', 'test-key-123');
      const client = createApiClient();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handlers = (client.interceptors.request as any).handlers as Array<{
        fulfilled: (config: { headers: Record<string, string> }) => {
          headers: Record<string, string>;
        };
      }>;
      const handler = handlers[0];
      const result = handler.fulfilled({ headers: {} });
      expect(result.headers['x-api-key']).toBe('test-key-123');
    });

    it('does not attach x-api-key header when localStorage is empty', () => {
      const client = createApiClient();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handlers = (client.interceptors.request as any).handlers as Array<{
        fulfilled: (config: { headers: Record<string, string> }) => {
          headers: Record<string, string>;
        };
      }>;
      const handler = handlers[0];
      const result = handler.fulfilled({ headers: {} });
      expect(result.headers['x-api-key']).toBeUndefined();
    });
  });

  describe('response interceptor', () => {
    it('passes through successful ApiResponse envelope', () => {
      const client = createApiClient();
      const response = {
        data: { ok: true, data: { status: 'ok' } },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as never,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handlers = (client.interceptors.response as any).handlers as Array<{
        fulfilled: (response: unknown) => unknown;
      }>;
      const handler = handlers[0];
      const result = handler.fulfilled(response);
      expect(result).toBe(response);
    });

    it('throws ApiClientError for failure envelope', () => {
      const client = createApiClient();
      const response = {
        data: { ok: false, error: { code: ErrorCode.UNAUTHORIZED, message: 'Invalid key' } },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as never,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handlers = (client.interceptors.response as any).handlers as Array<{
        fulfilled: (response: unknown) => unknown;
      }>;
      const handler = handlers[0];
      expect(() => {
        handler.fulfilled(response);
      }).toThrow('Invalid key');
    });

    it('handles network errors with unified message', () => {
      const client = createApiClient();
      const error = {
        request: {},
        message: 'Network Error',
        config: {} as never,
        isAxiosError: true,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handlers = (client.interceptors.response as any).handlers as Array<{
        rejected: (error: unknown) => unknown;
      }>;
      const handler = handlers[0];
      expect(() => {
        handler.rejected(error);
      }).toThrow('Network error: unable to reach the server');
    });

    it('handles server errors with error envelope in response', () => {
      const client = createApiClient();
      const error = {
        response: {
          data: {
            ok: false,
            error: { code: ErrorCode.RATE_LIMITED, message: 'Too many requests' },
          },
          status: 429,
          statusText: 'Too Many Requests',
          headers: {},
        },
        message: 'Request failed with status code 429',
        config: {} as never,
        isAxiosError: true,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handlers = (client.interceptors.response as any).handlers as Array<{
        rejected: (error: unknown) => unknown;
      }>;
      const handler = handlers[0];
      expect(() => {
        handler.rejected(error);
      }).toThrow('Too many requests');
    });
  });

  describe('error helpers', () => {
    it('getApiClientErrorMessage extracts message from ApiClientError', () => {
      const client = createApiClient();
      const response = {
        data: { ok: false, error: { code: ErrorCode.UNAUTHORIZED, message: 'Auth failed' } },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as never,
      };

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handlers = (client.interceptors.response as any).handlers as Array<{
          fulfilled: (response: unknown) => unknown;
        }>;
        const handler = handlers[0];
        handler.fulfilled(response);
      } catch (err) {
        expect(getApiClientErrorMessage(err)).toBe('Auth failed');
        expect(getApiClientErrorCode(err)).toBe(ErrorCode.UNAUTHORIZED);
        expect(isApiClientError(err)).toBe(true);
      }
    });

    it('getApiClientErrorMessage handles generic Error', () => {
      const err = new Error('generic error');
      expect(getApiClientErrorMessage(err)).toBe('generic error');
      expect(isApiClientError(err)).toBe(false);
    });

    it('getApiClientErrorMessage handles unknown errors', () => {
      expect(getApiClientErrorMessage(null)).toBe('An unknown error occurred');
      expect(isApiClientError(null)).toBe(false);
    });
  });
});
