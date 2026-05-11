import { z } from 'zod';
import { ErrorCode } from '@repo/config';
import type { ContractEntry } from './types.js';
import { ContractError } from './errors.js';

/**
 * Minimal interface that mirrors Electron's `ipcMain`.
 * This keeps `@repo/contracts` free of an `electron` dependency.
 */
export interface IpcMainLike {
  handle(channel: string, listener: (event: unknown, ...args: unknown[]) => Promise<unknown>): void;
}

/**
 * Binds a contract to an IPC main process.
 *
 * For each entry in the contract, an `ipcMain.handle` call is registered.
 * Input is validated against the contract's Zod schema before invoking the handler.
 * Output is wrapped in the unified `{ok, data}` / `{ok: false, error}` envelope
 * so the renderer-side client can consume it the same way as HTTP responses.
 */
export function bindContractToIpc<
  TContract extends Record<string, ContractEntry<unknown, unknown>>,
>(
  ipcMain: IpcMainLike,
  contract: TContract,
  handlers: Record<string, unknown>,
  namespace?: string
): void {
  for (const [key, entry] of Object.entries(contract)) {
    const handler = handlers[key] as (input: unknown) => Promise<unknown>;
    const channel = namespace ? `${namespace}.${key}` : key;

    ipcMain.handle(channel, async (_event, raw) => {
      try {
        const input = entry.input.parse(raw);
        const output = await handler(input);
        return { ok: true, data: output };
      } catch (err) {
        if (err instanceof ContractError) {
          return {
            ok: false,
            error: { code: err.code, message: err.message, details: err.details },
          };
        }

        if (err instanceof z.ZodError || (err instanceof Error && err.name === 'ZodError')) {
          const issues = (err as z.ZodError).issues;
          return {
            ok: false,
            error: {
              code: ErrorCode.VALIDATION_FAILED,
              message: 'Validation failed',
              details: issues,
            },
          };
        }

        if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
          console.error(`IPC error on ${channel}:`, err);
        }
        return {
          ok: false,
          error: { code: ErrorCode.INTERNAL_ERROR, message: 'Internal server error' },
        };
      }
    });
  }
}
