/**
 * Error thrown by contract handlers to signal domain-level failures.
 * Adapters translate this into transport-specific error responses.
 */
export class ContractError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ContractError';
  }
}
