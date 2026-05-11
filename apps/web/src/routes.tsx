import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { Layout } from '@/components/layout.js';

const HomePage = lazy(() => import('@/pages/home.js').then((m) => ({ default: m.HomePage })));
const SettingsPage = lazy(() =>
  import('@/pages/settings.js').then((m) => ({ default: m.SettingsPage }))
);
const ProvidersPage = lazy(() =>
  import('@/pages/providers.js').then((m) => ({ default: m.ProvidersPage }))
);
const PlaygroundPage = lazy(() =>
  import('@/pages/playground.js').then((m) => ({ default: m.PlaygroundPage }))
);

function PageLoader() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/providers" element={<ProvidersPage />} />
          {import.meta.env.DEV && <Route path="/playground" element={<PlaygroundPage />} />}
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
