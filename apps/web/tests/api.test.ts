import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchHealth } from '@/lib/api.js';
import * as apiClientModule from '@/lib/api-client.js';

describe('API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchHealth', () => {
    it('calls GET /api/health and unwraps envelope data', async () => {
      const mockResponse = {
        data: {
          ok: true,
          data: {
            status: 'ok' as const,
            timestamp: '2026-04-29T12:00:00.000Z',
            version: '1.0.0',
          },
        },
      };

      vi.spyOn(apiClientModule.apiClient, 'get').mockResolvedValue(mockResponse);

      const result = await fetchHealth();
      expect(result).toEqual({
        status: 'ok',
        timestamp: '2026-04-29T12:00:00.000Z',
        version: '1.0.0',
      });
    });

    it('propagates errors from the client', async () => {
      vi.spyOn(apiClientModule.apiClient, 'get').mockRejectedValue(new Error('Network error'));

      await expect(fetchHealth()).rejects.toThrow('Network error');
    });
  });
});
