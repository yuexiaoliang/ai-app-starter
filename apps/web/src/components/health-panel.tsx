import { useQuery } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.js';
import { Button } from '@/components/ui/button.js';
import { Badge } from '@/components/ui/badge.js';
import { fetchHealth } from '@/lib/api.js';

export function HealthPanel() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
    staleTime: 5_000,
    refetchInterval: 30_000,
  });

  const status = isLoading ? 'loading' : isError ? 'error' : 'connected';

  const statusConfig = {
    connected: {
      label: 'Connected',
      dotClass: 'bg-emerald-500',
      badgeVariant: 'default' as const,
    },
    loading: {
      label: 'Connecting',
      dotClass: 'bg-muted-foreground animate-pulse',
      badgeVariant: 'secondary' as const,
    },
    error: {
      label: 'Not connected',
      dotClass: 'bg-destructive',
      badgeVariant: 'destructive' as const,
    },
  };

  const config = statusConfig[status];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Server Status</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            void refetch();
          }}
          disabled={isFetching}
          aria-label="Refresh health status"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${config.dotClass}`} />
          <Badge variant={config.badgeVariant}>{config.label}</Badge>
        </div>

        {data && (
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span className="font-medium">{data.version}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Timestamp</span>
              <span className="font-medium">{new Date(data.timestamp).toLocaleString()}</span>
            </div>
          </div>
        )}

        {isError && (
          <p className="mt-4 text-sm text-destructive">
            {error instanceof Error ? error.message : 'Failed to connect to server'}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
