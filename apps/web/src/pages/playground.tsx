import { useState, useRef, useEffect } from 'react';
import {
  Palette,
  Archive,
  Search,
  Boxes,
  ArrowUpDown,
  Cpu,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge.js';
import { Button } from '@/components/ui/button.js';
import { Input } from '@/components/ui/input.js';
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
  status?: 'active' | 'archived';
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                         */
/* ------------------------------------------------------------------ */

const MOCK_PROVIDERS = [
  { id: 'openai', name: 'OpenAI', modelCount: 24, npm: 'openai', api: 'api.openai.com' },
  {
    id: 'anthropic',
    name: 'Anthropic',
    modelCount: 12,
    npm: '@anthropic-ai/sdk',
    api: 'api.anthropic.com',
  },
  {
    id: 'google',
    name: 'Google',
    modelCount: 18,
    npm: '@google/generative-ai',
    api: 'generativelanguage.googleapis.com',
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    modelCount: 8,
    npm: '@mistralai/mistralai',
    api: 'api.mistral.ai',
  },
  { id: 'cohere', name: 'Cohere', modelCount: 6, npm: 'cohere-ai', api: 'api.cohere.com' },
];

const MOCK_MODELS = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    costInput: 2.5,
    costOutput: 10.0,
    contextLimit: 128000,
    toolCall: true,
    attachment: true,
    reasoning: false,
    openWeights: false,
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    costInput: 3.0,
    costOutput: 15.0,
    contextLimit: 200000,
    toolCall: true,
    attachment: true,
    reasoning: true,
    openWeights: false,
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    costInput: 3.5,
    costOutput: 10.5,
    contextLimit: 2000000,
    toolCall: true,
    attachment: true,
    reasoning: false,
    openWeights: false,
  },
];

function formatPrice(price: number): string {
  if (price < 1) return `$${price.toFixed(3)}`;
  return `$${price.toFixed(2)}`;
}

function formatContext(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

/* ------------------------------------------------------------------ */
/*  Archived: Full-page layout variants (from previous round)         */
/* ------------------------------------------------------------------ */

function ProvidersCompact() {
  const [sortBy, setSortBy] = useState<'name' | 'modelCount'>('name');

  return (
    <div className="w-full max-w-full space-y-2">
      <div className="flex flex-col gap-1.5 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Provider name..." className="h-8 pl-7 text-xs" />
        </div>
        <div className="relative flex-1">
          <Boxes className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Model name..." className="h-8 pl-7 text-xs" />
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={() => setSortBy('name')}
          >
            <ArrowUpDown className="mr-1 h-3 w-3" />
            Name{sortBy === 'name' && ' ↑'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={() => setSortBy('modelCount')}
          >
            <Cpu className="mr-1 h-3 w-3" />
            Count{sortBy === 'modelCount' && ' ↑'}
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border rounded-md border">
        {MOCK_PROVIDERS.map((p) => (
          <div
            key={p.id}
            className="flex cursor-pointer items-center justify-between px-3 py-2 transition-colors hover:bg-muted/40"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span className="truncate text-sm font-medium">{p.name}</span>
              <span className="hidden text-xs text-muted-foreground sm:inline">{p.id}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Cpu className="h-3 w-3" />
                {p.modelCount}
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">Load more...</p>
    </div>
  );
}

function ProvidersGrid() {
  return (
    <div className="w-full max-w-full space-y-4">
      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search provider name..." className="pl-10" />
            </div>
            <div className="relative flex-1">
              <Boxes className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by model name..." className="pl-10" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-1 h-3 w-3" />
              Name
            </Button>
            <Button variant="outline" size="sm">
              <Cpu className="mr-1 h-3 w-3" />
              Model Count
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {MOCK_PROVIDERS.map((p) => (
          <Card key={p.id} className="cursor-pointer transition-shadow hover:shadow-md">
            <CardContent className="space-y-3 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">ID: {p.id}</p>
                </div>
                <Badge variant="secondary">{p.modelCount} models</Badge>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                {p.npm && (
                  <div className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    NPM: {p.npm}
                  </div>
                )}
                {p.api && (
                  <div className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    API: {p.api}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProvidersTable() {
  return (
    <div className="w-full max-w-full space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search provider name..." className="pl-9" />
        </div>
        <div className="relative flex-1">
          <Boxes className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by model name..." className="pl-9" />
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Provider</th>
              <th className="px-3 py-2 text-left font-medium">ID</th>
              <th className="px-3 py-2 text-left font-medium">NPM</th>
              <th className="px-3 py-2 text-right font-medium">Models</th>
              <th className="px-3 py-2 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MOCK_PROVIDERS.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-muted/40">
                <td className="px-3 py-2 font-medium">{p.name}</td>
                <td className="px-3 py-2 text-muted-foreground">{p.id}</td>
                <td className="px-3 py-2 text-muted-foreground">{p.npm || '-'}</td>
                <td className="px-3 py-2 text-right">{p.modelCount}</td>
                <td className="px-3 py-2 text-right">
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProvidersSplit() {
  const [selected, setSelected] = useState(MOCK_PROVIDERS[0].id);
  const provider = MOCK_PROVIDERS.find((p) => p.id === selected)!;

  return (
    <div className="flex w-full max-w-full flex-col gap-3 sm:flex-row">
      <div className="flex shrink-0 flex-col gap-2 sm:w-48">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search..." className="h-8 pl-7 text-xs" />
        </div>
        <div className="flex flex-col gap-1">
          {MOCK_PROVIDERS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={cn(
                'flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors',
                selected === p.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              )}
            >
              <span className="truncate font-medium">{p.name}</span>
              <span className="text-xs opacity-70">{p.modelCount}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="min-w-0 flex-1 space-y-3">
        <Card>
          <CardContent className="space-y-2 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{provider.name}</h3>
              <Badge variant="secondary">{provider.modelCount} models</Badge>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span>ID: {provider.id}</span>
              {provider.npm && <span>NPM: {provider.npm}</span>}
              {provider.api && <span>API: {provider.api}</span>}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-2">
          {MOCK_MODELS.map((m) => (
            <Card key={m.id} className="overflow-hidden">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{m.name}</span>
                  <div className="flex gap-1">
                    {m.toolCall && (
                      <Badge variant="secondary" className="text-[10px]">
                        Tools
                      </Badge>
                    )}
                    {m.attachment && (
                      <Badge variant="secondary" className="text-[10px]">
                        Vision
                      </Badge>
                    )}
                    {m.reasoning && (
                      <Badge variant="secondary" className="text-[10px]">
                        Reasoning
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="mt-1.5 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <div>In: {formatPrice(m.costInput)}/M</div>
                  <div>Out: {formatPrice(m.costOutput)}/M</div>
                  <div>Ctx: {formatContext(m.contextLimit)}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
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
  const componentGroups: ComponentGroup[] = [
    {
      id: 'providers-refactor',
      label: 'Providers Refactor',
      status: 'archived',
      components: [
        {
          name: 'Variant A — Compact List',
          description: 'High information density. Providers as slim rows with minimal padding.',
          variants: [{ name: 'Preview', render: <ProvidersCompact /> }],
        },
        {
          name: 'Variant B — Spacious Grid',
          description: 'Two-column card grid with generous whitespace.',
          variants: [{ name: 'Preview', render: <ProvidersGrid /> }],
        },
        {
          name: 'Variant C — Data Table',
          description: 'Tabular layout with aligned columns.',
          variants: [{ name: 'Preview', render: <ProvidersTable /> }],
        },
        {
          name: 'Variant D — Split View',
          description: 'Left sidebar lists providers; right panel shows details inline.',
          variants: [{ name: 'Preview', render: <ProvidersSplit /> }],
        },
      ],
    },
  ];

  const activeGroups = componentGroups.filter((g) => g.status !== 'archived');
  const archivedGroups = componentGroups.filter((g) => g.status === 'archived');

  const [activeGroup, setActiveGroup] = useState<string>(
    activeGroups[0]?.id ?? archivedGroups[0]?.id ?? ''
  );
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

  const renderNavButton = (group: ComponentGroup, isArchived: boolean) => (
    <button
      key={group.id}
      ref={activeGroup === group.id ? activeGroupRef : null}
      onClick={() => setActiveGroup(group.id)}
      className={cn(
        'flex items-center rounded-md px-3 py-2 text-left text-sm font-medium transition-colors',
        activeGroup === group.id
          ? 'bg-primary text-primary-foreground'
          : isArchived
            ? 'text-muted-foreground hover:text-foreground hover:bg-accent'
            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
      )}
    >
      {group.label}
      {!isArchived && <span className="ml-auto text-xs opacity-60">{group.components.length}</span>}
    </button>
  );

  const renderMobileTab = (group: ComponentGroup, isArchived: boolean) => (
    <button
      key={group.id}
      ref={activeGroup === group.id ? activeGroupRef : null}
      onClick={() => setActiveGroup(group.id)}
      className={cn(
        'shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        activeGroup === group.id
          ? 'bg-primary text-primary-foreground'
          : isArchived
            ? 'text-muted-foreground hover:text-foreground hover:bg-accent'
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

          {activeGroups.length > 0 && (
            <nav className="flex flex-col gap-1">
              {activeGroups.map((g) => renderNavButton(g, false))}
            </nav>
          )}

          {archivedGroups.length > 0 && (
            <>
              <h3 className="mb-2 mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Archive className="h-3 w-3" />
                Archived
              </h3>
              <nav className="flex flex-col gap-1">
                {archivedGroups.map((g) => renderNavButton(g, true))}
              </nav>
            </>
          )}
        </div>
      </aside>

      {/* Mobile tab bar */}
      <div
        ref={scrollRef}
        className="scrollbar-hide sticky top-14 z-30 -mx-4 w-[calc(100%+2rem)] overflow-x-auto border-b bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden"
      >
        <div className="flex gap-1">{activeGroups.map((g) => renderMobileTab(g, false))}</div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {currentGroup ? (
          <>
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight">{currentGroup.label}</h1>
                {currentGroup.status === 'archived' && <Badge variant="secondary">Archived</Badge>}
              </div>
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
