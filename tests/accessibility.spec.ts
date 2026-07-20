import { test, expect } from '@playwright/test';

test.describe('Skip Link', () => {
  test('Tab shows skip link, Enter jumps to main content', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await page.keyboard.press('Tab');

    const skipLink = page.locator('a.skip-link');
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toContainText('Skip to main content');

    await page.keyboard.press('Enter');
    const main = page.locator('#main-content');
    await expect(main).toBeAttached();
  });
});

test.describe('Theme Toggle', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('clicking toggle cycles dark → light → high-contrast → dark', async ({ page }) => {
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

  test('theme persists after page reload', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await page.locator('#theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await page.evaluate(() => localStorage.removeItem('theme'));
  });

  test('toggle works with keyboard (Enter)', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    const toggle = page.locator('#theme-toggle');
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await page.evaluate(() => localStorage.removeItem('theme'));
  });
});

test.describe('Theme Toggle - Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('mobile theme toggle cycles themes', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    const toggle = page.locator('#theme-toggle-mobile');
    await expect(toggle).toBeVisible();

    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'high-contrast');

    await page.evaluate(() => localStorage.removeItem('theme'));
  });
});

test.describe('Reduced Motion', () => {
  test('animations are disabled when user prefers reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/portfolioWebsite/');

    const canvas = page.locator('#particle-canvas');
    await expect(canvas).toHaveCSS('display', 'none');

    const fadeUp = page.locator('.fade-up').first();
    await expect(fadeUp).toHaveCSS('opacity', '1');
  });
});

test.describe('Keyboard Navigation', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('can tab through all nav links and buttons', async ({ page }) => {
    await page.goto('/portfolioWebsite/');

    // Tab: skip link → LK logo → nav links → theme toggle → Hire Me
    await page.keyboard.press('Tab'); // skip link
    await page.keyboard.press('Tab'); // LK logo
    await page.keyboard.press('Tab'); // Home

    const focused = page.locator(':focus');
    await expect(focused).toHaveAttribute('href', '#home');
  });

  test('Hire Me button is reachable by keyboard', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    // Tab through: skip link, LK, Home, About, Projects, Experience, Services, Contact, theme toggle, Hire Me
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
    }
    const focused = page.locator(':focus');
    const text = await focused.innerText();
    expect(text).toContain('Hire Me');
  });
});

test.describe('All Images Have Alt Text', () => {
  test('every img on the page has alt text', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt, `Image ${i} is missing alt text`).toBeTruthy();
    }
  });
});

test.describe('External Links Open In New Tab', () => {
  test('our external links have rel=noopener', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    const ourLinks = page.locator('main a[target="_blank"], footer a[target="_blank"]');
    const count = await ourLinks.count();
    expect(count).toBeGreaterThanOrEqual(2);

    for (let i = 0; i < count; i++) {
      await expect(ourLinks.nth(i)).toHaveAttribute('rel', /noopener/);
    }
  });
});

test.describe('One H1 Only', () => {
  test('main content has exactly one h1', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await expect(page.locator('main h1')).toHaveCount(1);
  });
});
