import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test('drawer navigation appears on small viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Hamburger button should be visible
    await expect(page.locator('button[aria-label="Open navigation menu"]')).toBeVisible();

    // Desktop nav links should be hidden
    await expect(page.locator('nav a:has-text("Home")')).not.toBeVisible();
  });

  test('clicking hamburger opens drawer with nav links', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await page.locator('button[aria-label="Open navigation menu"]').click();

    // Drawer should contain nav links
    await expect(page.locator('[role="dialog"] a:has-text("Home")')).toBeVisible();
    await expect(page.locator('[role="dialog"] a:has-text("Settings")')).toBeVisible();
  });

  test('navigating from drawer closes it', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await page.locator('button[aria-label="Open navigation menu"]').click();
    await page.locator('[role="dialog"] a:has-text("Settings")').click();

    // Should navigate to settings
    await expect(page).toHaveURL('/settings');

    // Drawer should be closed
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });
});
