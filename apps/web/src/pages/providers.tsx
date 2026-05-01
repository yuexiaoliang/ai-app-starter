import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Search, ArrowUpDown, Boxes, Cpu } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card.js';
import { Input } from '@/components/ui/input.js';
import { Button } from '@/components/ui/button.js';
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

function ModelDetailDialog({
  open,
  onOpenChange,
  provider,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  provider: ProviderListItem | null;
}) {
  const pageSize = 10;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['provider-models', provider?.id, pageSize],
    queryFn: ({ pageParam }) =>
      provider
        ? fetchProviderModels(provider.id, pageParam, pageSize)
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
      <InfiniteList
        scrollContainerClassName="mt-4 flex-1 space-y-3 pr-1 overflow-y-auto"
        header={
          provider ? (
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary">{provider.modelCount} models</Badge>
              {provider.npm && <span>NPM: {provider.npm}</span>}
              {provider.api && <span>API: {provider.api}</span>}
            </div>
          ) : undefined
        }
        items={allModels}
        renderItem={(model: ModelItem) => (
          <div className="rounded-md border p-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium">{model.name}</span>
              <div className="flex gap-1">
                {model.toolCall && (
                  <Badge variant="secondary" className="text-xs">
                    Tools
                  </Badge>
                )}
                {model.attachment && (
                  <Badge variant="secondary" className="text-xs">
                    Vision
                  </Badge>
                )}
                {model.reasoning && (
                  <Badge variant="secondary" className="text-xs">
                    Reasoning
                  </Badge>
                )}
                {model.openWeights && (
                  <Badge variant="outline" className="text-xs">
                    Open
                  </Badge>
                )}
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
              <div>Input: {formatPrice(model.costInput)}/M</div>
              <div>Output: {formatPrice(model.costOutput)}/M</div>
              <div>Context: {formatContext(model.contextLimit)}</div>
            </div>
          </div>
        )}
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
  const [nameQuery, setNameQuery] = useState('');
  const [modelQuery, setModelQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'modelCount'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const pageSize = 15;

  const [selectedProvider, setSelectedProvider] = useState<ProviderListItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['providers', nameQuery, modelQuery, sortBy, sortOrder, pageSize],
    queryFn: ({ pageParam }) =>
      fetchProviders({
        name: nameQuery || undefined,
        modelName: modelQuery || undefined,
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
        <CardContent className="p-3 space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search provider name..."
                className="pl-9"
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
              />
            </div>
            <div className="relative flex-1">
              <Boxes className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by model name..."
                className="pl-9"
                value={modelQuery}
                onChange={(e) => setModelQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort('name')}
              className={sortBy === 'name' ? 'bg-muted' : ''}
            >
              <ArrowUpDown className="mr-1 h-3 w-3" />
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort('modelCount')}
              className={sortBy === 'modelCount' ? 'bg-muted' : ''}
            >
              <Cpu className="mr-1 h-3 w-3" />
              Model Count {sortBy === 'modelCount' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <InfiniteList
        useWindowScroll
        header={
          <p className="text-xs text-muted-foreground">
            Showing {allProviders.length} of {total.toLocaleString()} providers
          </p>
        }
        items={allProviders}
        renderItem={(provider: ProviderListItem) => (
          <Card
            className="cursor-pointer transition-colors hover:bg-muted/50"
            onClick={() => handleOpenDetail(provider)}
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm">{provider.name}</h3>
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
        )}
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
      />
    </div>
  );
}
