import { defineConfig } from '@playwright/test';

/**
 * Playwright configuration for the Electron desktop smoke test.
 *
 * Tests the packaged application binary to catch "does not start"
 * regressions that unit tests cannot.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'list',
  timeout: 60000,
  use: {
    trace: 'on-first-retry',
  },
});
