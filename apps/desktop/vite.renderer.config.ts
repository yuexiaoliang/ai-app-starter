import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

/**
 * Renderer Vite config for the Electron desktop app.
 *
 * The root is pointed at `apps/web` so the same `index.html` and source
 * files serve both the browser deployment and the desktop shell.
 */
export default defineConfig({
  root: resolve(__dirname, '../web'),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../web/src'),
    },
  },
  build: {
    outDir: resolve(__dirname, '.vite/renderer/main_window'),
    sourcemap: true,
  },
});
