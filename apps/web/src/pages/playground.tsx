import { useState, useRef, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card.js';
import { cn } from '@/lib/utils.js';

export interface ComponentVariant {
  name: string;
  render: React.ReactNode;
}

export interface ComponentDemo {
  name: string;
  description?: string;
  variants: ComponentVariant[];
}

export interface ComponentGroup {
  id: string;
  label: string;
  components: ComponentDemo[];
}

/* ------------------------------------------------------------------ */
/*  Showcase Card                                                     */
/* ------------------------------------------------------------------ */

function ShowcaseCard({ demo }: { demo: ComponentDemo }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{demo.name}</CardTitle>
        {demo.description && <CardDescription>{demo.description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {demo.variants.map((variant) => (
            <div
              key={variant.name}
              className="flex flex-col items-start gap-2 rounded-lg border border-dashed border-border bg-muted/30 p-4"
            >
              <span className="text-xs font-medium text-muted-foreground">{variant.name}</span>
              <div className="w-full overflow-x-auto">{variant.render}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export function PlaygroundPage() {
  const componentGroups: ComponentGroup[] = [];

  const [activeGroup, setActiveGroup] = useState<string>(componentGroups[0]?.id ?? '');
  const activeGroupRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentGroup = componentGroups.find((g) => g.id === activeGroup);

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (activeGroupRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const element = activeGroupRef.current;
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const isVisible =
        elementRect.left >= containerRect.left && elementRect.right <= containerRect.right;
      if (!isVisible) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeGroup]);

  const renderNavButton = (group: ComponentGroup) => (
    <button
      key={group.id}
      ref={activeGroup === group.id ? activeGroupRef : null}
      onClick={() => setActiveGroup(group.id)}
      className={cn(
        'flex items-center rounded-md px-3 py-2 text-left text-sm font-medium transition-colors',
        activeGroup === group.id
          ? 'bg-primary text-primary-foreground'
          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
      )}
    >
      {group.label}
      <span className="ml-auto text-xs opacity-60">{group.components.length}</span>
    </button>
  );

  const renderMobileTab = (group: ComponentGroup) => (
    <button
      key={group.id}
      ref={activeGroup === group.id ? activeGroupRef : null}
      onClick={() => setActiveGroup(group.id)}
      className={cn(
        'shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        activeGroup === group.id
          ? 'bg-primary text-primary-foreground'
          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
      )}
    >
      {group.label}
    </button>
  );

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-8">
      {/* Desktop sidebar */}
      <aside className="hidden shrink-0 md:block md:w-52">
        <div className="sticky top-20">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Palette className="h-4 w-4" />
            Components
          </h2>

          {componentGroups.length > 0 && (
            <nav className="flex flex-col gap-1">
              {componentGroups.map((g) => renderNavButton(g))}
            </nav>
          )}
        </div>
      </aside>

      {/* Mobile tab bar */}
      {componentGroups.length > 0 && (
        <div
          ref={scrollRef}
          className="scrollbar-hide sticky top-14 z-30 -mx-4 w-[calc(100%+2rem)] overflow-x-auto border-b bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden"
        >
          <div className="flex gap-1">{componentGroups.map((g) => renderMobileTab(g))}</div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        {currentGroup ? (
          <>
            <div className="mb-4">
              <h1 className="text-2xl font-bold tracking-tight">{currentGroup.label}</h1>
              <p className="text-muted-foreground">
                {currentGroup.components.length} component showcase
                {currentGroup.components.length > 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {currentGroup.components.map((demo) => (
                <ShowcaseCard key={demo.name} demo={demo} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <Palette className="h-12 w-12 text-muted-foreground/50" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Playground</h1>
              <p className="mt-2 max-w-md text-muted-foreground">
                Add component groups to the{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm">componentGroups</code>{' '}
                array in{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm">playground.tsx</code> to
                start showcasing your components.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
