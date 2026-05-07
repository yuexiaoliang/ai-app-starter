import { Hono, type Context } from 'hono';
import { z } from 'zod';
import { ok, fail, ErrorCode } from '@repo/config';
import type { ContractEntry } from './types.js';
import { ContractError } from './errors.js';

/**
 * Binds a contract to a Hono application.
 *
 * For each entry in the contract, a route is registered. Input is validated
 * against the contract's Zod schema (merged from path params, query params,
 * and JSON body). Handlers are pure functions and may throw `ContractError`
 * to produce domain-level failures (e.g. 404 NOT_FOUND).
 */
export function bindContractToHono<
  TContract extends Record<string, ContractEntry<unknown, unknown>>,
>(app: Hono, contract: TContract, handlers: Record<string, unknown>): void {
  for (const [key, entry] of Object.entries(contract)) {
    const handler = handlers[key as string] as (input: unknown) => Promise<unknown>;

    const routeHandler = async (c: Context) => {
      try {
        // Build raw input from all available sources.
        // Priority: params > query > body (params cannot be overridden).
        const params = c.req.param();
        const query = c.req.query();
        let body: Record<string, unknown> = {};

        if (entry.method === 'POST' || entry.method === 'PUT') {
          try {
            body = (await c.req.json()) as Record<string, unknown>;
          } catch {
            // No body or invalid JSON — leave as empty object.
          }
        }

        const rawInput = { ...body, ...query, ...params };

        // Validate input through the contract schema.
        const input = entry.input.parse(rawInput);

        // Invoke the pure handler.
        const output = await handler(input);

        // Wrap in the unified API response envelope.
        const statusCode = entry.method === 'POST' ? 201 : 200;
        return c.json(ok(output), statusCode);
      } catch (err) {
        if (err instanceof ContractError) {
          return c.json(
            fail(err.code, err.message, err.details),
            err.statusCode as 400 | 404 | 500
          );
        }

        if (err instanceof z.ZodError || (err instanceof Error && err.name === 'ZodError')) {
          const issues = (err as z.ZodError).issues;
          return c.json(fail(ErrorCode.VALIDATION_FAILED, 'Validation failed', issues), 400);
        }

        // Log unexpected errors and return a generic 500.
        console.error('Route error:', err);
        return c.json(fail(ErrorCode.INTERNAL_ERROR, 'Internal server error'), 500);
      }
    };

    switch (entry.method) {
      case 'GET':
        app.get(entry.path, routeHandler);
        break;
      case 'POST':
        app.post(entry.path, routeHandler);
        break;
      case 'PUT':
        app.put(entry.path, routeHandler);
        break;
      case 'DELETE':
        app.delete(entry.path, routeHandler);
        break;
    }
  }
}
