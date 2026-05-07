import type { Transport } from '@repo/contracts';

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
      return bridge.invoke<O>(channel, input);
    },
  };
}
