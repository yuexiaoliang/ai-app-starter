import { DEFAULT_API_BASE_URL } from '@repo/config';
import { taskContract, providerContract } from '@repo/contracts';
import type { ContractEntry, Transport } from '@repo/contracts';
import { createHttpTransport } from './http.js';
import { createIpcTransport } from './ipc.js';

export type { Transport } from '@repo/contracts';
export { createHttpTransport } from './http.js';
export { createIpcTransport } from './ipc.js';
export { isApiClientError, getApiClientErrorMessage, getApiClientErrorCode } from './http.js';

const allEntries = new Map<string, ContractEntry<unknown, unknown>>();

for (const [key, entry] of Object.entries(taskContract)) {
  allEntries.set(`tasks.${key}`, entry);
}
for (const [key, entry] of Object.entries(providerContract)) {
  allEntries.set(`providers.${key}`, entry);
}

let _transport: Transport | null = null;

export function getTransport(): Transport {
  if (_transport) return _transport;

  if (typeof window !== 'undefined' && window.bridge) {
    _transport = createIpcTransport();
    return _transport;
  }

  const baseURL = localStorage.getItem('api-base-url') || DEFAULT_API_BASE_URL;
  _transport = createHttpTransport(baseURL, allEntries);
  return _transport;
}

export function resetTransport(): void {
  _transport = null;
}

// API key auto-acquisition on module load (browser only)
(function acquireApiKey() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const key = params.get('api-key');
  if (key) {
    localStorage.setItem('api-key', key);
    const url = new URL(window.location.href);
    url.searchParams.delete('api-key');
    window.history.replaceState({}, '', url.toString());
  }
})();
