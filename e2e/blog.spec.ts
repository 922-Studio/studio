import {test, expect} from '@playwright/test';

test.describe('Blog', () => {
  test('blog list page loads', async ({page}) => {
    await page.goto('/en/blog');
    await expect(page.getByRole('heading', {name: 'Blog'})).toBeVisible();
  });

  test('shows blog post in list', async ({page}) => {
    await page.goto('/en/blog');
    await expect(page.getByText('Introducing 922-Studio')).toBeVisible();
  });

  test('clicking read more navigates to post', async ({page}) => {
    await page.goto('/en/blog');
    await page.getByRole('link', {name: /Read more/i}).first().click();
    await expect(page).toHaveURL(/\/en\/blog\/welcome/);
    await expect(page.getByRole('heading', {name: 'Introducing 922-Studio'})).toBeVisible();
  });

  test('back to blog link works', async ({page}) => {
    await page.goto('/en/blog/welcome');
    await page.getByRole('link', {name: /Back to blog/i}).click();
    await expect(page).toHaveURL('/en/blog');
  });
});
