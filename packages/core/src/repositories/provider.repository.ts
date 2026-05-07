import { sql, like, eq, desc, asc, and, or } from 'drizzle-orm';
import type { DB } from '../db/index.js';
import { providers, models } from '../db/schema.js';

export interface ProviderRow {
  id: string;
  name: string;
  npm: string | null;
  api: string | null;
  doc: string | null;
  env: string[] | null;
  modelCount: number;
  syncedAt: Date;
}

export interface ModelRow {
  id: string;
  providerId: string;
  modelId: string;
  name: string;
  family: string | null;
  toolCall: boolean;
  attachment: boolean;
  reasoning: boolean;
  temperature: boolean;
  structuredOutput: boolean;
  knowledge: string | null;
  releaseDate: string | null;
  lastUpdated: string | null;
  modalities: string | null;
  openWeights: boolean;
  costInput: number | null;
  costOutput: number | null;
  costCacheRead: number | null;
  costCacheWrite: number | null;
  contextLimit: number | null;
  outputLimit: number | null;
  inputLimit: number | null;
}

export interface ListProvidersInput {
  query?: string;
  sortBy?: 'name' | 'modelCount';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ListProviderModelsInput {
  providerId: string;
  query?: string;
  page?: number;
  pageSize?: number;
}

export class ProviderRepository {
  constructor(private db: DB) {}

  async list(input: ListProvidersInput = {}): Promise<PaginatedResult<ProviderRow>> {
    const sortBy = input.sortBy ?? 'name';
    const sortOrder = input.sortOrder ?? 'asc';
    const page = input.page ?? 1;
    const pageSize = input.pageSize ?? 20;

    let whereClause;

    if (input.query) {
      const nameLike = like(providers.name, `%${input.query}%`);

      const matchingModels = this.db
        .select({ providerId: models.providerId })
        .from(models)
        .where(like(models.name, `%${input.query}%`))
        .all();
      const providerIds = [...new Set(matchingModels.map((m) => m.providerId))];

      if (providerIds.length > 0) {
        whereClause = or(nameLike, sql`${providers.id} IN ${providerIds}`);
      } else {
        whereClause = nameLike;
      }
    }

    const countResult = this.db
      .select({ count: sql<number>`count(*)` })
      .from(providers)
      .where(whereClause)
      .get();
    const total = countResult?.count ?? 0;

    const baseOrderBy =
      sortBy === 'modelCount'
        ? sortOrder === 'desc'
          ? desc(providers.modelCount)
          : asc(providers.modelCount)
        : sortOrder === 'desc'
          ? desc(providers.name)
          : asc(providers.name);

    const orderBy = input.query
      ? [sql`CASE WHEN ${providers.name} LIKE ${`%${input.query}%`} THEN 0 ELSE 1 END`, baseOrderBy]
      : [baseOrderBy];

    const offset = (page - 1) * pageSize;

    const items = this.db
      .select()
      .from(providers)
      .where(whereClause)
      .orderBy(...orderBy)
      .limit(pageSize)
      .offset(offset)
      .all();

    return { items: items as ProviderRow[], total, page, pageSize };
  }

  async findById(id: string): Promise<ProviderRow | null> {
    const provider = this.db.select().from(providers).where(eq(providers.id, id)).get();
    return (provider as ProviderRow | undefined) ?? null;
  }

  async listModels(input: ListProviderModelsInput): Promise<PaginatedResult<ModelRow>> {
    const page = input.page ?? 1;
    const pageSize = input.pageSize ?? 20;

    const modelWhere = input.query
      ? and(eq(models.providerId, input.providerId), like(models.name, `%${input.query}%`))
      : eq(models.providerId, input.providerId);

    const countResult = this.db
      .select({ count: sql<number>`count(*)` })
      .from(models)
      .where(modelWhere)
      .get();
    const total = countResult?.count ?? 0;

    const offset = (page - 1) * pageSize;

    const items = this.db
      .select()
      .from(models)
      .where(modelWhere)
      .orderBy(asc(models.name))
      .limit(pageSize)
      .offset(offset)
      .all();

    return { items: items as ModelRow[], total, page, pageSize };
  }
}
