import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../web/src'),
    },
  },
  server: {
    port: 13002,
    strictPort: false,
    host: '0.0.0.0',
  },
  build: {
    sourcemap: true,
  },
});
