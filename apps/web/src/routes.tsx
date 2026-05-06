import { Routes, Route } from 'react-router';
import { Layout } from '@/components/layout.js';
import { HomePage } from '@/pages/home.js';
import { SettingsPage } from '@/pages/settings.js';
import { ProvidersPage } from '@/pages/providers.js';
import { PlaygroundPage } from '@/pages/playground.js';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/providers" element={<ProvidersPage />} />
        {import.meta.env.DEV && <Route path="/playground" element={<PlaygroundPage />} />}
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
