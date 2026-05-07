import type { z } from 'zod';
import type { ContractEntry } from './types.js';

/**
 * Transport abstraction. A transport carries a named invocation (channel + input)
 * to the server and returns the output.
 *
 * Implementations:
 * - HTTP: maps the channel back to a REST request using the contract entry.
 * - IPC: delegates to `window.bridge.invoke(channel, input)`.
 */
export interface Transport {
  invoke<I, O>(channel: string, input: I): Promise<O>;
}

/**
 * Derives a typed client from a contract object.
 *
 * Resolves input/output types from the Zod schemas directly via `z.infer`
 * instead of relying on `_types`, because `satisfies ContractEntry<unknown, unknown>`
 * erases the concrete generic args.
 */
export type ContractClient<TContract extends Record<string, ContractEntry<unknown, unknown>>> = {
  [K in keyof TContract]: TContract[K] extends {
    input: infer ZIn;
    output: infer ZOut;
  }
    ? ZIn extends z.ZodTypeAny
      ? ZOut extends z.ZodTypeAny
        ? (input: z.infer<ZIn>) => Promise<z.infer<ZOut>>
        : never
      : never
    : never;
};

/**
 * Creates a typed client for a contract using the supplied transport.
 *
 * @param contract - RPC contract entries
 * @param transport - transport implementation
 * @param namespace - optional prefix for the channel name (e.g. "tasks" produces "tasks.list")
 */
export function createClient<TContract extends Record<string, ContractEntry<unknown, unknown>>>(
  contract: TContract,
  transport: Transport,
  namespace?: string
): ContractClient<TContract> {
  const client = {} as ContractClient<TContract>;

  for (const [key] of Object.entries(contract)) {
    const channel = namespace ? `${namespace}.${key}` : key;
    (client as Record<string, (input: unknown) => Promise<unknown>>)[key] = async (
      input: unknown
    ) => {
      return transport.invoke(channel, input);
    };
  }

  return client;
}
