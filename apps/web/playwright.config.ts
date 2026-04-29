import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:13002',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: [
    {
      command: 'pnpm --filter @repo/server dev',
      url: 'http://localhost:13001/api/health',
      reuseExistingServer: !process.env.CI,
      timeout: 30000,
      env: { NODE_ENV: 'development' },
    },
    {
      command: 'pnpm dev',
      url: 'http://localhost:13002',
      reuseExistingServer: !process.env.CI,
      timeout: 30000,
    },
  ],
});
