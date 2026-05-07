import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Providers } from '@/components/providers.js';
import { AppRoutes } from '@/routes.js';
import { useThemeEffect } from '@/store/use-theme.js';

// Import transport to trigger API key auto-acquisition side effect
import '@/transport/index.js';

import './index.css';

function App() {
  useThemeEffect();
  return <AppRoutes />;
}

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
