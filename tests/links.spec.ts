import { test, expect } from '@playwright/test';

test.describe('External Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolioWebsite/');
  });

  test('GitHub links point to correct profile', async ({ page }) => {
    const ghLinks = page.locator('a[href="https://github.com/LKoech"]');
    const count = await ghLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('LinkedIn links point to correct profile', async ({ page }) => {
    const liLinks = page.locator('a[href="https://www.linkedin.com/in/lydia-kipkorir1"]');
    const count = await liLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('all external links have target="_blank"', async ({ page }) => {
    const externalLinks = page.locator('a[href^="https://"]');
    const count = await externalLinks.count();
    for (let i = 0; i < count; i++) {
      await expect(externalLinks.nth(i)).toHaveAttribute('target', '_blank');
    }
  });

  test('our external links have rel="noopener noreferrer"', async ({ page }) => {
    const ourLinks = page.locator('a[href^="https://github.com/LKoech"], a[href^="https://www.linkedin.com/in/lydia"]');
    const count = await ourLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(ourLinks.nth(i)).toHaveAttribute('rel', /noopener/);
    }
  });
});
