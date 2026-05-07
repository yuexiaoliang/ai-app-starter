import type { Transport } from '@repo/contracts';
import { ApiClientError } from './http.js';

export interface Bridge {
  invoke<T>(channel: string, payload: unknown): Promise<T>;
}

declare global {
  interface Window {
    bridge?: Bridge;
  }
}

export function createIpcTransport(): Transport {
  const bridge = window.bridge;
  if (!bridge) {
    throw new Error(
      'IPC bridge is not available. Ensure preload script exposes window.bridge.invoke.'
    );
  }

  return {
    async invoke<I, O>(channel: string, input: I): Promise<O> {
      type SuccessEnvelope<O> = { ok: true; data: O };
      type ErrorEnvelope = { ok: false; error: { code: string; message: string } };

      const result = await bridge.invoke<SuccessEnvelope<O> | ErrorEnvelope>(channel, input);

      if ('ok' in result && result.ok === true) {
        return result.data;
      }

      const error = (result as ErrorEnvelope).error;
      throw new ApiClientError(error.message, error.code);
    },
  };
}
