import type { z } from 'zod';

/**
 * A single entry in an RPC contract. Declares the HTTP method, path,
 * input schema, and output schema for one endpoint.
 *
 * The input schema describes the complete object passed to the handler.
 * For HTTP adapters, this object is built by merging path params,
 * query params, and (for POST/PUT) the JSON body.
 */
export interface ContractEntry<Input, Output> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  input: z.ZodType<Input>;
  output: z.ZodType<Output>;
  /** Runtime no-op; exists so TypeScript can resolve handler types reliably. */
  _types?: { input: Input; output: Output };
}

/**
 * Type helper that extracts the handler signature from a contract entry.
 */
export type ContractHandler<T> =
  T extends ContractEntry<infer I, infer O> ? (input: I) => Promise<O> : never;

/**
 * Derives a map of handlers from a contract object.
 * Uses the `_types` sentinel property to avoid conditional-type inference
 * issues with deeply-nested Zod schemas (e.g. `z.preprocess`, `z.default`).
 */
export type ContractHandlers<TContract extends Record<string, ContractEntry<unknown, unknown>>> = {
  [K in keyof TContract]: TContract[K] extends { _types: { input: infer I; output: infer O } }
    ? (input: I) => Promise<O>
    : never;
};
