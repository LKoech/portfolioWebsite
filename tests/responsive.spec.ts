import { test, expect } from '@playwright/test';

test.describe('Responsive - Desktop', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('desktop nav links are visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#navbar a[href="#about"]').first()).toBeVisible();
  });

  test('mobile menu button is hidden on desktop', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#mobile-menu-btn')).toBeHidden();
  });

  test('no horizontal overflow', async ({ page }) => {
    await page.goto('/');
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });
});

test.describe('Responsive - Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('mobile menu button is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#mobile-menu-btn')).toBeVisible();
  });

  test('all sections are visible on mobile', async ({ page }) => {
    await page.goto('/');
    const sections = ['#home', '#about', '#projects', '#experience', '#services', '#contact'];
    for (const id of sections) {
      await expect(page.locator(id)).toBeAttached();
    }
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.goto('/');
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });
});
