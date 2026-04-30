import { Routes, Route } from 'react-router';
import { Layout } from '@/components/layout.js';
import { HomePage } from '@/pages/home.js';
import { SettingsPage } from '@/pages/settings.js';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
