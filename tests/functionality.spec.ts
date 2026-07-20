import { test, expect } from '@playwright/test';

test.describe('Hero Buttons', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolioWebsite/');
  });

  test('Let\'s Talk scrolls to contact section', async ({ page }) => {
    await page.click('a:has-text("Let\'s Talk")');
    await page.waitForTimeout(800);
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('View Projects scrolls to projects section', async ({ page }) => {
    await page.click('a:has-text("View Projects")');
    await page.waitForTimeout(800);
    await expect(page.locator('#projects')).toBeInViewport();
  });

  test('View CV links to PDF and opens in new tab', async ({ page }) => {
    const cvBtn = page.locator('a:has-text("View CV")');
    await expect(cvBtn).toHaveAttribute('href', /Lydia_Kipkorir_resume\.pdf/);
    await expect(cvBtn).toHaveAttribute('target', '_blank');
  });
});

test.describe('Nav Link Scrolling', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  const navTargets = [
    { label: 'About', section: '#about' },
    { label: 'Projects', section: '#projects' },
    { label: 'Experience', section: '#experience' },
    { label: 'Services', section: '#services' },
    { label: 'Contact', section: '#contact' },
  ];

  for (const { label, section } of navTargets) {
    test(`clicking "${label}" scrolls to ${section}`, async ({ page }) => {
      await page.goto('/portfolioWebsite/');
      await page.click(`#navbar .hidden.md\\:flex a[href="${section}"]`);
      await page.waitForTimeout(800);
      await expect(page.locator(section)).toBeInViewport();
    });
  }

  test('clicking "Home" scrolls back to top', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    // Scroll down first
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(300);

    await page.click('#navbar .hidden.md\\:flex a[href="#home"]');
    await page.waitForTimeout(800);
    await expect(page.locator('#home')).toBeInViewport();
  });

  test('Hire Me button scrolls to contact', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await page.locator('#navbar a:has-text("Hire Me")').first().click();
    await page.waitForTimeout(800);
    await expect(page.locator('#contact')).toBeInViewport();
  });
});

test.describe('Mobile Nav Scrolling', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('mobile menu link scrolls to section and closes menu', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await page.click('#mobile-menu-btn');
    const menu = page.locator('#mobile-menu');
    await expect(menu).toHaveAttribute('data-open', 'true');

    await page.click('#mobile-menu a[href="#projects"]');
    await page.waitForTimeout(800);

    await expect(menu).toHaveAttribute('data-open', 'false');
    await expect(page.locator('#projects')).toBeInViewport();
  });

  test('mobile Hire Me scrolls to contact', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await page.click('#mobile-menu-btn');
    await page.click('#mobile-menu a:has-text("Hire Me")');
    await page.waitForTimeout(800);
    await expect(page.locator('#contact')).toBeInViewport();
  });
});

test.describe('Project Cards', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('project card opens correct GitHub repo', async ({ page, context }) => {
    await page.goto('/portfolioWebsite/');
    const firstCard = page.locator('#projects .glass-card').first();
    const href = await firstCard.getAttribute('href');
    expect(href).toContain('github.com/LKoech');

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      firstCard.click(),
    ]);
    expect(newPage.url()).toContain('github.com/LKoech');
    await newPage.close();
  });

  test('View All Repositories link opens GitHub profile', async ({ page, context }) => {
    await page.goto('/portfolioWebsite/');
    const link = page.locator('a:has-text("View All 38 Repositories")');
    await expect(link).toBeVisible();

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      link.click(),
    ]);
    expect(newPage.url()).toContain('github.com/LKoech');
    await newPage.close();
  });
});

test.describe('About Section Buttons', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('GitHub button opens profile in new tab', async ({ page, context }) => {
    await page.goto('/portfolioWebsite/');
    const ghBtn = page.locator('#about a:has-text("GitHub")');
    await expect(ghBtn).toBeVisible();

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      ghBtn.click(),
    ]);
    expect(newPage.url()).toContain('github.com/LKoech');
    await newPage.close();
  });

  test('LinkedIn button opens profile in new tab', async ({ page, context }) => {
    await page.goto('/portfolioWebsite/');
    const liBtn = page.locator('#about a:has-text("LinkedIn")');
    await expect(liBtn).toBeVisible();

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      liBtn.click(),
    ]);
    expect(newPage.url()).toContain('linkedin.com/in/lydia-kipkorir1');
    await newPage.close();
  });
});

test.describe('Contact Section', () => {
  test('email button has correct mailto link', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    const emailBtn = page.locator('#contact a[href="mailto:lydiakipkorir1@gmail.com"]');
    await expect(emailBtn).toBeVisible();
    await expect(emailBtn).toContainText('lydiakipkorir1@gmail.com');
  });

  test('GitHub icon opens profile in new tab', async ({ page, context }) => {
    await page.goto('/portfolioWebsite/');
    const ghIcon = page.locator('#contact a[href="https://github.com/LKoech"]');
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      ghIcon.click(),
    ]);
    expect(newPage.url()).toContain('github.com/LKoech');
    await newPage.close();
  });
});

test.describe('Chat Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolioWebsite/');
  });

  test('chat window opens when bubble is clicked', async ({ page }) => {
    const chatWindow = page.locator('#chat-window');
    await expect(chatWindow).toBeHidden();

    await page.click('#chat-toggle');
    await expect(chatWindow).toBeVisible();
  });

  test('chat window closes when bubble is clicked again', async ({ page }) => {
    await page.click('#chat-toggle');
    await expect(page.locator('#chat-window')).toBeVisible();

    await page.click('#chat-toggle');
    await expect(page.locator('#chat-window')).toBeHidden();
  });

  test('chat has welcome message', async ({ page }) => {
    await page.click('#chat-toggle');
    await expect(page.locator('#chat-messages')).toContainText("Hi! I'm Lydia's AI assistant");
  });

  test('chat input accepts text', async ({ page }) => {
    await page.click('#chat-toggle');
    const input = page.locator('#chat-input');
    await input.fill('What does Lydia do?');
    await expect(input).toHaveValue('What does Lydia do?');
  });

  test('empty message does not submit', async ({ page }) => {
    await page.click('#chat-toggle');
    const messagesBefore = await page.locator('#chat-messages > div').count();
    await page.click('#chat-form button[type="submit"]');
    const messagesAfter = await page.locator('#chat-messages > div').count();
    expect(messagesAfter).toBe(messagesBefore);
  });
});

test.describe('LK Logo', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('clicking LK logo scrolls to top', async ({ page }) => {
    await page.goto('/portfolioWebsite/');
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(300);

    await page.click('#navbar a:has-text("LK")');
    await page.waitForTimeout(800);
    await expect(page.locator('#home')).toBeInViewport();
  });
});
