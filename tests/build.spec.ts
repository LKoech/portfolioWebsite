import { test, expect } from '@playwright/test';

test.describe('Build & HTML', () => {
  test('page loads successfully', async ({ page }) => {
    const response = await page.goto('/portfolioWebsite/');
    expect(response?.status()).toBe(200);
  });

  test('has correct page title', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await expect(page).toHaveTitle('Lydia Kipkorir | Software Engineer');
  });

  test('has meta description', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute('content', /Software Engineer/);
  });

  test('has favicon', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    const favicon = page.locator('link[rel="icon"]');
    await expect(favicon).toHaveAttribute('href', /favicon/);
  });
});
