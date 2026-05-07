import { QueryClientProvider } from '@tanstack/react-query';
import { HashRouter } from 'react-router';
import { queryClient } from '@/lib/query-client.js';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>{children}</HashRouter>
    </QueryClientProvider>
  );
}
