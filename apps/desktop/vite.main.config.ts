import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: './src/main.ts',
      formats: ['cjs'],
      fileName: () => 'main.js',
    },
    rollupOptions: {
      external: ['electron', 'better-sqlite3', /^node:/],
    },
    sourcemap: true,
    minify: false,
  },
  resolve: {
    preserveSymlinks: true,
    alias: [
      {
        find: /^@repo\/core\/(.+)$/,
        replacement: path.resolve(__dirname, '../../packages/core/src/$1'),
      },
      {
        find: '@repo/core',
        replacement: path.resolve(__dirname, '../../packages/core/src/index.ts'),
      },
      {
        find: /^@repo\/contracts\/(.+)$/,
        replacement: path.resolve(__dirname, '../../packages/contracts/src/$1'),
      },
      {
        find: '@repo/contracts',
        replacement: path.resolve(__dirname, '../../packages/contracts/src/index.ts'),
      },
      {
        find: '@repo/config',
        replacement: path.resolve(__dirname, '../../packages/config/src/index.ts'),
      },
    ],
  },
});
