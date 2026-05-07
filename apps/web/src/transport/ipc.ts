import type { Transport, TransportRequest, TransportResponse } from './types.js';

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
    async request<T>(req: TransportRequest): Promise<TransportResponse<T>> {
      const data = await bridge.invoke<T>('rpc', req);
      return { data, status: 200 };
    },
  };
}
