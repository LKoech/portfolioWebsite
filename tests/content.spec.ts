import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays name and role', async ({ page }) => {
    await expect(page.locator('#home')).toContainText('Lydia Kipkorir');
    await expect(page.locator('#home')).toContainText('Full-Stack Engineer');
  });

  test('has CTA buttons and CV link', async ({ page }) => {
    await expect(page.locator('a:has-text("Let\'s Talk")')).toBeVisible();
    await expect(page.locator('a:has-text("View Projects")')).toBeVisible();
    const cvBtn = page.locator('a:has-text("View CV")');
    await expect(cvBtn).toBeVisible();
    await expect(cvBtn).toHaveAttribute('href', '/Lydia_Kipkorir_resume.pdf');
  });
});

test.describe('Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders 6 project cards linking to GitHub', async ({ page }) => {
    const cards = page.locator('#projects .glass-card');
    await expect(cards).toHaveCount(6);
    const links = page.locator('#projects a[href*="github.com/LKoech"]');
    expect(await links.count()).toBeGreaterThanOrEqual(6);
  });
});

test.describe('Experience Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders 3 entries with logos and descriptions', async ({ page }) => {
    await expect(page.locator('#experience .flex.items-center.gap-4')).toHaveCount(3);
    await expect(page.locator('#experience img')).toHaveCount(3);
    await expect(page.locator('#experience')).toContainText('Goldman Sachs');
    await expect(page.locator('#experience')).toContainText('Software Engineer, Full-Stack');
    await expect(page.locator('#experience')).toContainText('Engineering Summer Intern');
    await expect(page.locator('#experience')).toContainText('Mentor');
  });
});

test.describe('About Section', () => {
  test('displays stats and does not mention Goldman Sachs', async ({ page }) => {
    await page.goto('/');
    const about = page.locator('#about');
    await expect(about).toContainText('2+');
    await expect(about).toContainText('10+');
    await expect(about).toContainText('300+');
    await expect(about).toContainText('38');
    await expect(about).not.toContainText('Goldman Sachs');
  });
});

test.describe('Services & Contact', () => {
  test('renders 6 service cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#services .glass-card')).toHaveCount(6);
  });

  test('displays correct email', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href="mailto:lydiakipkorir1@gmail.com"]').first()).toBeVisible();
  });
});
