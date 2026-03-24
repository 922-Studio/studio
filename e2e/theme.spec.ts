import {test, expect} from '@playwright/test';

test.describe('Theme toggle', () => {
  test('page loads with dark mode by default', async ({page}) => {
    await page.goto('/en');
    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).toContain('dark');
  });

  test('theme toggle button is visible', async ({page}) => {
    await page.goto('/en');
    await expect(page.getByRole('button', {name: /toggle/i}).first()).toBeVisible();
  });

  test('clicking theme toggle switches to light mode', async ({page}) => {
    await page.goto('/en');
    await page.getByRole('button', {name: /Toggle light mode/i}).click();
    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).not.toContain('dark');
  });

  test('theme persists on navigation', async ({page}) => {
    await page.goto('/en');
    // Switch to light mode
    await page.getByRole('button', {name: /Toggle light mode/i}).click();
    // Navigate to blog
    await page.getByRole('link', {name: 'Blog'}).first().click();
    await page.waitForURL('/en/blog');
    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).not.toContain('dark');
  });
});
