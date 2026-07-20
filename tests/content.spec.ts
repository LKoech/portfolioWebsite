import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolioWebsite/');
  });

  test('displays name', async ({ page }) => {
    await expect(page.locator('#home')).toContainText('Lydia Kipkorir');
  });

  test('displays role tagline', async ({ page }) => {
    await expect(page.locator('#home')).toContainText('Full-Stack Engineer');
  });

  test('has CTA buttons', async ({ page }) => {
    await expect(page.locator('a:has-text("Let\'s Talk")')).toBeVisible();
    await expect(page.locator('a:has-text("View Projects")')).toBeVisible();
  });

  test('has View CV button', async ({ page }) => {
    const cvBtn = page.locator('a:has-text("View CV")');
    await expect(cvBtn).toBeVisible();
    await expect(cvBtn).toHaveAttribute('href', '/portfolioWebsite/Lydia_Kipkorir_resume.pdf');
    await expect(cvBtn).toHaveAttribute('target', '_blank');
  });
});

test.describe('Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolioWebsite/');
  });

  const expectedProjects = [
    'Voice-to-Voice Translator',
    'JWT Authentication Service',
    'MusicTranslateApp',
    'Disease Prediction App',
    'Library Management System',
    'AI Resume Analyser',
  ];

  test('renders all 6 project cards', async ({ page }) => {
    const cards = page.locator('#projects .glass-card');
    await expect(cards).toHaveCount(6);
  });

  for (const title of expectedProjects) {
    test(`displays project: ${title}`, async ({ page }) => {
      await expect(page.locator('#projects')).toContainText(title);
    });
  }

  test('project cards link to GitHub', async ({ page }) => {
    const links = page.locator('#projects a[href*="github.com/LKoech"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('all project links open in new tab', async ({ page }) => {
    const links = page.locator('#projects .glass-card[target="_blank"]');
    const count = await links.count();
    expect(count).toBe(6);
  });
});

test.describe('Experience Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolioWebsite/');
  });

  test('renders all 3 experience entries', async ({ page }) => {
    const entries = page.locator('#experience .flex.items-center.gap-4');
    await expect(entries).toHaveCount(3);
  });

  test('displays Goldman Sachs', async ({ page }) => {
    const expSection = page.locator('#experience');
    await expect(expSection).toContainText('Goldman Sachs');
  });

  test('displays correct job titles', async ({ page }) => {
    await expect(page.locator('#experience')).toContainText('Software Engineer, Full-Stack');
    await expect(page.locator('#experience')).toContainText('Engineering Summer Intern');
    await expect(page.locator('#experience')).toContainText('Mentor');
  });

  test('displays company logos', async ({ page }) => {
    const logos = page.locator('#experience img');
    await expect(logos).toHaveCount(3);
  });

  test('displays one-line descriptions', async ({ page }) => {
    await expect(page.locator('#experience')).toContainText('10+ APIs');
    await expect(page.locator('#experience')).toContainText('Elasticsearch');
    await expect(page.locator('#experience')).toContainText('Mentoring');
  });

});


test.describe('Services Section', () => {
  test('renders all 6 service cards', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    const cards = page.locator('#services .glass-card');
    await expect(cards).toHaveCount(6);
  });
});

test.describe('About Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolioWebsite/');
  });

  test('displays stat cards', async ({ page }) => {
    await expect(page.locator('#about')).toContainText('2+');
    await expect(page.locator('#about')).toContainText('10+');
    await expect(page.locator('#about')).toContainText('300+');
    await expect(page.locator('#about')).toContainText('38');
  });

  test('does not mention Goldman Sachs', async ({ page }) => {
    await expect(page.locator('#about')).not.toContainText('Goldman Sachs');
  });
});

test.describe('Contact Section', () => {
  test('displays correct email', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    const emailLink = page.locator('a[href="mailto:lydiakipkorir1@gmail.com"]');
    await expect(emailLink.first()).toBeVisible();
  });
});
