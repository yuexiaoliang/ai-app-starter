import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Search, Cpu, X, SlidersHorizontal, SortAsc, SortDesc, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils.js';
import { Card, CardContent } from '@/components/ui/card.js';
import { Input } from '@/components/ui/input.js';
import { Badge } from '@/components/ui/badge.js';
import { AnimatedDialog, DialogHeader, DialogTitle } from '@/components/ui/dialog.js';
import { InfiniteList } from '@/components/infinite-list.js';
import {
  fetchProviders,
  fetchProviderModels,
  type ProviderListItem,
  type ModelItem,
} from '@/lib/api.js';

function formatPrice(price: number | null): string {
  if (price === null) return '-';
  if (price === 0) return 'Free';
  if (price < 0.01) return `$${price.toFixed(4)}`;
  if (price < 1) return `$${price.toFixed(3)}`;
  return `$${price.toFixed(2)}`;
}

function formatContext(n: number | null): string {
  if (n === null) return '-';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

function parseModalities(raw: string | null): { input: string[]; output: string[] } | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { input?: string[]; output?: string[] };
    if (Array.isArray(parsed.input) && Array.isArray(parsed.output)) {
      return { input: parsed.input, output: parsed.output };
    }
  } catch {
    // ignore parse errors
  }
  return null;
}

function ModelDetailDialog({
  open,
  onOpenChange,
  provider,
  query,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  provider: ProviderListItem | null;
  query: string;
}) {
  const pageSize = 10;
  const [localQuery, setLocalQuery] = useState('');
  const [debouncedLocalQuery, setDebouncedLocalQuery] = useState('');

  // Seed the detail search only when the provider was matched via models.
  // Name-matched providers open with an empty search to show all models.
  const providerId = provider?.id;
  const providerName = provider?.name;

  useEffect(() => {
    if (open && providerName !== undefined) {
      const isViaModels = query && !providerName.toLowerCase().includes(query.toLowerCase());
      const initial = isViaModels ? query : '';
      setLocalQuery(initial);
      setDebouncedLocalQuery(initial);
    }
  }, [open, providerId, providerName, query]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedLocalQuery(localQuery), 300);
    return () => clearTimeout(timer);
  }, [localQuery]);

  const modelQuery = debouncedLocalQuery || undefined;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['provider-models', provider?.id, modelQuery, pageSize],
    queryFn: ({ pageParam }) =>
      provider
        ? fetchProviderModels(provider.id, pageParam, pageSize, modelQuery)
        : Promise.resolve({ items: [], total: 0, page: 1, pageSize }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.pageSize);
      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },
    enabled: !!provider && open,
  });

  const allModels = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <AnimatedDialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="shrink-0">
        <DialogTitle>{provider?.name}</DialogTitle>
      </DialogHeader>
      <div className="mt-3 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search models..."
            className="pl-10 pr-8"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
          />
          {localQuery && (
            <button
              onClick={() => setLocalQuery('')}
              className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
      <InfiniteList
        className="space-y-3"
        scrollContainerClassName="mt-3 flex-1 space-y-3 pr-1 overflow-y-auto"
        header={
          provider ? (
            <div className="space-y-1.5 text-xs">
              <Badge variant="secondary">{provider.modelCount} models</Badge>
              <div className="flex flex-col gap-0.5 text-muted-foreground">
                {provider.npm && (
                  <span className="truncate">
                    <span className="text-muted-foreground/60">NPM</span> {provider.npm}
                  </span>
                )}
                {provider.api && (
                  <span className="truncate">
                    <span className="text-muted-foreground/60">API</span> {provider.api}
                  </span>
                )}
              </div>
            </div>
          ) : undefined
        }
        items={allModels}
        renderItem={(model: ModelItem) => {
          const modalities = parseModalities(model.modalities);
          return (
            <div className="group rounded-lg border p-3 text-sm transition-colors hover:border-primary/20 hover:bg-muted/20">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <span className="font-semibold tracking-tight">{model.name}</span>
                <div className="flex flex-wrap gap-1">
                  {model.toolCall && (
                    <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
                      Tools
                    </Badge>
                  )}
                  {model.attachment && (
                    <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
                      Vision
                    </Badge>
                  )}
                  {model.reasoning && (
                    <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
                      Reasoning
                    </Badge>
                  )}
                  {model.openWeights && (
                    <Badge variant="outline" className="h-4 px-1.5 text-[10px]">
                      Open
                    </Badge>
                  )}
                </div>
              </div>
              <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
                <div className="rounded-md bg-muted/50 px-2.5 py-1.5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Input
                  </div>
                  <div className="mt-0.5 text-xs font-medium tabular-nums">
                    {formatPrice(model.costInput)}/M
                  </div>
                </div>
                <div className="rounded-md bg-muted/50 px-2.5 py-1.5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Output
                  </div>
                  <div className="mt-0.5 text-xs font-medium tabular-nums">
                    {formatPrice(model.costOutput)}/M
                  </div>
                </div>
                <div className="rounded-md bg-muted/50 px-2.5 py-1.5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Context
                  </div>
                  <div className="mt-0.5 text-xs font-medium tabular-nums">
                    {formatContext(model.contextLimit)}
                  </div>
                </div>
              </div>
              {modalities && (
                <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted-foreground">
                  <span>{modalities.input.join('+')}</span>
                  <ArrowRight className="h-3 w-3 shrink-0 text-border" />
                  <span>{modalities.output.join('+')}</span>
                </div>
              )}
            </div>
          );
        }}
        keyExtractor={(model: ModelItem) => model.id}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        onLoadMore={() => void fetchNextPage()}
        emptyText="No models found."
        loadingText="Loading models..."
      />
    </AnimatedDialog>
  );
}

export function ProvidersPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'modelCount'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const pageSize = 15;

  const [selectedProvider, setSelectedProvider] = useState<ProviderListItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['providers', debouncedQuery, sortBy, sortOrder, pageSize],
    queryFn: ({ pageParam }) =>
      fetchProviders({
        query: debouncedQuery || undefined,
        sortBy,
        sortOrder,
        page: pageParam,
        pageSize,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.pageSize);
      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },
  });

  const allProviders = data?.pages.flatMap((page) => page.items) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  const toggleSort = (field: 'name' | 'modelCount') => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleOpenDetail = (provider: ProviderListItem) => {
    setSelectedProvider(provider);
    setDetailOpen(true);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Providers</h1>
        <p className="text-sm text-muted-foreground">
          {isLoading ? 'Loading...' : `${total.toLocaleString()} providers synced from models.dev`}
        </p>
      </div>

      <Card>
        <CardContent className="space-y-2 p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search providers or models..."
              className="pl-10 pr-8"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Sort by</span>
            <div className="flex gap-1">
              <button
                onClick={() => toggleSort('name')}
                className={cn(
                  'flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors',
                  sortBy === 'name'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                Name
                {sortBy === 'name' &&
                  (sortOrder === 'asc' ? (
                    <SortAsc className="h-3 w-3" />
                  ) : (
                    <SortDesc className="h-3 w-3" />
                  ))}
              </button>
              <button
                onClick={() => toggleSort('modelCount')}
                className={cn(
                  'flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors',
                  sortBy === 'modelCount'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                Model Count
                {sortBy === 'modelCount' &&
                  (sortOrder === 'asc' ? (
                    <SortAsc className="h-3 w-3" />
                  ) : (
                    <SortDesc className="h-3 w-3" />
                  ))}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <InfiniteList
        className="space-y-3"
        useWindowScroll
        header={
          <p className="text-xs text-muted-foreground">
            Showing {allProviders.length} of {total.toLocaleString()} providers
          </p>
        }
        items={allProviders}
        renderItem={(provider: ProviderListItem) => {
          const index = allProviders.findIndex((p) => p.id === provider.id);
          const isFirstViaModels =
            debouncedQuery &&
            !provider.name.toLowerCase().includes(debouncedQuery.toLowerCase()) &&
            (index === 0 ||
              allProviders[index - 1].name.toLowerCase().includes(debouncedQuery.toLowerCase()));

          return (
            <>
              {isFirstViaModels && (
                <div className="flex items-center gap-3 py-2">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground">Matched via models</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
              )}
              <Card
                className="cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => handleOpenDetail(provider)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{provider.name}</h3>
                      {debouncedQuery && (
                        <Badge variant="outline" className="text-[10px]">
                          {provider.name.toLowerCase().includes(debouncedQuery.toLowerCase())
                            ? 'name match'
                            : 'via models'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">ID: {provider.id}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Cpu className="h-3.5 w-3.5" />
                      {provider.modelCount}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </>
          );
        }}
        keyExtractor={(provider: ProviderListItem) => provider.id}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        onLoadMore={() => void fetchNextPage()}
        emptyText="No providers match your search."
        loadingText="Loading providers..."
      />

      <ModelDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        provider={selectedProvider}
        query={query}
      />
    </div>
  );
}
