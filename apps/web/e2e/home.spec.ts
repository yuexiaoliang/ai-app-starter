import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page, request }) => {
    // Verify backend is reachable before each test
    const health = await request.get('http://localhost:13001/api/health');
    expect(health.ok()).toBeTruthy();

    await page.goto('/');
  });

  test('page loads and displays health status panel', async ({ page }) => {
    await expect(page.locator('text=Server Status')).toBeVisible();
    // Wait for health API response
    await expect(page.locator('text=Connected')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Version')).toBeVisible();
    await expect(page.locator('text=Timestamp')).toBeVisible();
  });

  test('manual refresh button triggers a new request', async ({ page }) => {
    // Wait for initial health check to complete
    await expect(page.locator('text=Connected')).toBeVisible({ timeout: 10000 });
    await page.locator('button[aria-label="Refresh health status"]').click();
    await expect(page.locator('text=Connected')).toBeVisible();
  });

  test('theme toggle switches between light and dark mode', async ({ page }) => {
    const html = page.locator('html');

    // Start with system (likely light in test)
    await expect(html).not.toHaveClass(/dark/);

    const desktopThemeBtn = page.locator('.hidden.md\\:block button[title^="Theme:"]');
    const isDesktop = await desktopThemeBtn.isVisible().catch(() => false);

    // On mobile, open the drawer once; the theme toggle remains accessible
    if (!isDesktop) {
      await page.locator('button[aria-label="Open navigation menu"]').click();
      await page.waitForTimeout(200);
    }

    const themeBtn = isDesktop
      ? desktopThemeBtn
      : page.locator('[role="dialog"] button[title^="Theme:"]');

    // Click theme toggle: system -> light
    await themeBtn.click();
    await page.waitForTimeout(100);
    await expect(html).not.toHaveClass(/dark/);

    // Click again: light -> dark
    await themeBtn.click();
    await page.waitForTimeout(100);
    await expect(html).toHaveClass(/dark/);

    // Click again: dark -> system
    await themeBtn.click();
    await page.waitForTimeout(100);
    await expect(html).not.toHaveClass(/dark/);
  });

  test('theme persists after page refresh', async ({ page }) => {
    const html = page.locator('html');

    const desktopThemeBtn = page.locator('.hidden.md\\:block button[title^="Theme:"]');
    const isDesktop = await desktopThemeBtn.isVisible().catch(() => false);

    // On mobile, open the drawer once
    if (!isDesktop) {
      await page.locator('button[aria-label="Open navigation menu"]').click();
      await page.waitForTimeout(200);
    }

    const themeBtn = isDesktop
      ? desktopThemeBtn
      : page.locator('[role="dialog"] button[title^="Theme:"]');

    // Set to dark mode (system -> light -> dark)
    await themeBtn.click();
    await themeBtn.click();
    await page.waitForTimeout(100);
    await expect(html).toHaveClass(/dark/);

    // Refresh page
    await page.reload();
    await page.waitForTimeout(100);

    // Dark mode should persist
    await expect(html).toHaveClass(/dark/);
  });
});
