import {test, expect} from '@playwright/test';

test.describe('Navigation', () => {
  test('navigates from home to blog via nav link', async ({page}) => {
    await page.goto('/en');
    await page.getByRole('link', {name: 'Blog'}).first().click();
    await expect(page).toHaveURL('/en/blog');
    await expect(page.getByRole('heading', {name: 'Blog'})).toBeVisible();
  });

  test('navigates back to home from blog', async ({page}) => {
    await page.goto('/en/blog');
    await page.getByRole('link', {name: 'Home'}).first().click();
    await expect(page).toHaveURL('/en');
    await expect(page.getByRole('heading', {name: '922-Studio'})).toBeVisible();
  });

  test('root redirects to /en', async ({page}) => {
    await page.goto('/');
    await expect(page).toHaveURL('/en');
  });

  test('language switcher switches to DE', async ({page}) => {
    await page.goto('/en');
    await page.getByRole('link', {name: 'DE'}).click();
    await expect(page).toHaveURL('/de');
    await expect(page.getByRole('heading', {name: '922-Studio'})).toBeVisible();
  });
});
