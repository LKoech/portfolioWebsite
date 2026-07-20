import { test, expect } from '@playwright/test';

test.describe('Skip Link', () => {
  test('Tab shows skip link, Enter jumps to main content', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a.skip-link');
    await expect(skipLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeAttached();
  });
});

test.describe('Theme Toggle', () => {
  test('cycles dark → light → high-contrast → dark', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    const toggle = page.locator('#theme-toggle');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'high-contrast');
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('persists after reload', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await page.locator('#theme-toggle').click();
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.evaluate(() => localStorage.removeItem('theme'));
  });

  test('works with keyboard', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await page.locator('#theme-toggle').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.evaluate(() => localStorage.removeItem('theme'));
  });

});

test.describe('Theme Toggle Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('mobile toggle works', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await page.locator('#theme-toggle-mobile').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.evaluate(() => localStorage.removeItem('theme'));
  });
});

test.describe('Reduced Motion', () => {
  test('disables animations and hides canvas', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/portfolioWebsite/');
    await expect(page.locator('#particle-canvas')).toHaveCSS('display', 'none');
    await expect(page.locator('.fade-up').first()).toHaveCSS('opacity', '1');
  });
});

test.describe('Images & Semantics', () => {
  test('all images have alt text', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      expect(await images.nth(i).getAttribute('alt'), `Image ${i} missing alt`).toBeTruthy();
    }
  });

  test('main content has exactly one h1', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await expect(page.locator('main h1')).toHaveCount(1);
  });

  test('external links in main/footer have rel=noopener', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    const links = page.locator('main a[target="_blank"], footer a[target="_blank"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(2);
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toHaveAttribute('rel', /noopener/);
    }
  });
});
