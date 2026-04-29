import { test, expect } from '@playwright/test';

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings');
  });

  test('page loads with form elements', async ({ page }) => {
    await expect(page.locator('h1:has-text("Settings")')).toBeVisible();
    await expect(page.locator('label:has-text("Server Address")')).toBeVisible();
    await expect(page.locator('button:has-text("Test Connection")')).toBeVisible();
  });

  test('invalid URL shows validation error', async ({ page }) => {
    await page.fill('#server-url', 'not-a-url');
    // Wait for validation to trigger
    await page.waitForTimeout(200);
    // Button should be disabled when URL is invalid
    const button = page.locator('button:has-text("Test Connection")');
    await expect(button).toBeDisabled();
    // Clear input and check default value passes validation
    await page.fill('#server-url', 'http://localhost:13001');
    await page.waitForTimeout(200);
    await expect(button).toBeEnabled();
  });

  test('valid URL + test connection shows connected', async ({ page }) => {
    await page.fill('#server-url', 'http://localhost:13001');
    await page.locator('button:has-text("Test Connection")').click();
    await expect(page.locator('text=Connected')).toBeVisible({ timeout: 10000 });
  });

  test('footer displays correct app name and version', async ({ page }) => {
    await expect(page.locator('footer')).toContainText('ai-app-starter');
    await expect(page.locator('footer')).toContainText('v1.0.0');
    await expect(page.locator('footer a:has-text("GitHub Repository")')).toHaveAttribute(
      'href',
      'https://github.com/yuexiaoliang/ai-app-starter'
    );
  });
});
