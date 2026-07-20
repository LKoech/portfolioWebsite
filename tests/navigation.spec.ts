import { test, expect } from '@playwright/test';

test.describe('Navigation - Desktop', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolioWebsite/');
  });

  test('navbar is visible', async ({ page }) => {
    await expect(page.locator('#navbar')).toBeVisible();
  });

  test('all desktop nav links exist', async ({ page }) => {
    const links = ['#home', '#about', '#projects', '#experience', '#services', '#contact'];
    for (const href of links) {
      await expect(page.locator(`#navbar .hidden.md\\:flex a[href="${href}"]`)).toBeVisible();
    }
  });

  test('Hire Me button links to contact', async ({ page }) => {
    const hireBtn = page.locator('#navbar a:has-text("Hire Me")').first();
    await expect(hireBtn).toHaveAttribute('href', '#contact');
  });

  test('nav links scroll to correct sections', async ({ page }) => {
    await page.click('#navbar .hidden.md\\:flex a[href="#about"]');
    await page.waitForTimeout(500);
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();
  });

  test('navbar gets backdrop on scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(300);
    const nav = page.locator('#navbar');
    await expect(nav).toHaveClass(/backdrop-blur/);
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('mobile menu button is visible', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await expect(page.locator('#mobile-menu-btn')).toBeVisible();
  });

  test('mobile menu toggles on click', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    const menu = page.locator('#mobile-menu');
    await expect(menu).toHaveAttribute('data-open', 'false');
    await page.click('#mobile-menu-btn');
    await expect(menu).toHaveAttribute('data-open', 'true');
  });

  test('mobile menu closes when link is clicked', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await page.click('#mobile-menu-btn');
    const menu = page.locator('#mobile-menu');
    await expect(menu).toHaveAttribute('data-open', 'true');
    await page.click('.mobile-link >> nth=0');
    await expect(menu).toHaveAttribute('data-open', 'false');
  });

  test('all mobile nav links exist', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await page.click('#mobile-menu-btn');
    const links = ['#home', '#about', '#projects', '#experience', '#services', '#contact'];
    for (const href of links) {
      await expect(page.locator(`#mobile-menu a[href="${href}"]`).first()).toBeAttached();
    }
  });
});
