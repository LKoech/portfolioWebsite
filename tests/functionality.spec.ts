import { test, expect } from '@playwright/test';

test.describe('Hero Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
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

  test('View CV links to PDF in new tab', async ({ page }) => {
    const cvBtn = page.locator('a:has-text("View CV")');
    await expect(cvBtn).toHaveAttribute('href', /Lydia_Kipkorir_resume\.pdf/);
    await expect(cvBtn).toHaveAttribute('target', '_blank');
  });
});

test.describe('External Links', () => {
  test('project card opens GitHub repo', async ({ page, context }) => {
    await page.goto('/');
    const firstCard = page.locator('#projects .glass-card').first();
    expect(await firstCard.getAttribute('href')).toContain('github.com/LKoech');

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      firstCard.click(),
    ]);
    expect(newPage.url()).toContain('github.com/LKoech');
    await newPage.close();
  });

  test('About GitHub and LinkedIn open correct profiles', async ({ page, context }) => {
    await page.goto('/');

    const [ghPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('#about a:has-text("GitHub")').click(),
    ]);
    expect(ghPage.url()).toContain('github.com/LKoech');
    await ghPage.close();

    const [liPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('#about a:has-text("LinkedIn")').click(),
    ]);
    expect(liPage.url()).toContain('linkedin.com/in/lydia-kipkorir1');
    await liPage.close();
  });
});

test.describe('Chat Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('opens and closes on toggle click', async ({ page }) => {
    await expect(page.locator('#chat-window')).toBeHidden();
    await page.click('#chat-toggle');
    await expect(page.locator('#chat-window')).toBeVisible();
    await page.click('#chat-toggle');
    await expect(page.locator('#chat-window')).toBeHidden();
  });

  test('has welcome message and accepts input', async ({ page }) => {
    await page.click('#chat-toggle');
    await expect(page.locator('#chat-messages')).toContainText("Hi! I'm Lydia's AI assistant");
    const input = page.locator('#chat-input');
    await input.fill('What does Lydia do?');
    await expect(input).toHaveValue('What does Lydia do?');
  });

  test('empty message does not submit', async ({ page }) => {
    await page.click('#chat-toggle');
    const before = await page.locator('#chat-messages > div').count();
    await page.click('#chat-form button[type="submit"]');
    expect(await page.locator('#chat-messages > div').count()).toBe(before);
  });
});
