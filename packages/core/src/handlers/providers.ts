import { ErrorCode } from '@repo/config';
import { ContractError } from '@repo/contracts';
import type { DB } from '../db/index.js';
import { ProviderRepository } from '../repositories/index.js';

export function createProviderHandlers(db: DB) {
  const repo = new ProviderRepository(db);

  return {
    list: async (query: {
      query?: string;
      sortBy?: 'name' | 'modelCount';
      sortOrder?: 'asc' | 'desc';
      page?: number;
      pageSize?: number;
    }) => {
      return repo.list({
        query: query.query,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
        page: query.page,
        pageSize: query.pageSize,
      });
    },

    getById: async ({ id }: { id: string }) => {
      const provider = await repo.findById(id);
      if (!provider) {
        throw new ContractError(ErrorCode.NOT_FOUND, `Provider ${id} not found`, 404);
      }
      return provider;
    },

    listModels: async (input: { id: string; query?: string; page?: number; pageSize?: number }) => {
      const { id, ...query } = input;
      const provider = await repo.findById(id);
      if (!provider) {
        throw new ContractError(ErrorCode.NOT_FOUND, `Provider ${id} not found`, 404);
      }
      return repo.listModels({
        providerId: id,
        query: query.query,
        page: query.page,
        pageSize: query.pageSize,
      });
    },
  };
}
