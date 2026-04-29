import { Routes, Route } from 'react-router';
import { Layout } from '@/components/layout.js';
import { HomePage } from '@/pages/home.js';
import { SettingsPage } from '@/pages/settings.js';

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  );
}
