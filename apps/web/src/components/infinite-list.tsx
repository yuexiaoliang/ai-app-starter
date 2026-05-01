import { useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils.js';

interface InfiniteListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  header?: React.ReactNode;
  emptyText?: string;
  loadingText?: string;
  loadingMoreText?: string;
  noMoreText?: string;
  className?: string;
  scrollContainerClassName?: string;
  useWindowScroll?: boolean;
}

function InfiniteList<T>({
  items,
  renderItem,
  keyExtractor,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  onLoadMore,
  header,
  emptyText = 'No items found.',
  loadingText = 'Loading...',
  loadingMoreText = 'Loading more...',
  noMoreText = 'No more items',
  className,
  scrollContainerClassName,
  useWindowScroll = false,
}: InfiniteListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    let nearBottom: boolean;
    if (useWindowScroll) {
      nearBottom =
        document.documentElement.scrollHeight - window.scrollY - window.innerHeight < 200;
    } else {
      const el = containerRef.current;
      if (!el) return;
      nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    }

    if (nearBottom) {
      void onLoadMore();
    }
  }, [hasNextPage, isFetchingNextPage, onLoadMore, useWindowScroll]);

  useEffect(() => {
    if (!useWindowScroll) return;
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [useWindowScroll, handleScroll]);

  if (isLoading) {
    return <div className="py-8 text-center text-sm text-muted-foreground">{loadingText}</div>;
  }

  if (items.length === 0) {
    return <div className="py-8 text-center text-sm text-muted-foreground">{emptyText}</div>;
  }

  const listContent = (
    <div className={className}>
      {header}
      {items.map((item) => (
        <div key={keyExtractor(item)}>{renderItem(item)}</div>
      ))}
      {isFetchingNextPage && (
        <div className="py-4 text-center text-xs text-muted-foreground">{loadingMoreText}</div>
      )}
      {!hasNextPage && (
        <div className="py-4 text-center text-xs text-muted-foreground">{noMoreText}</div>
      )}
    </div>
  );

  if (useWindowScroll) {
    return listContent;
  }

  return (
    <div
      ref={containerRef}
      className={cn('overflow-y-auto', scrollContainerClassName)}
      onScroll={handleScroll}
    >
      {listContent}
    </div>
  );
}

export { InfiniteList };
export type { InfiniteListProps };
