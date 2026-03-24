import {test, expect} from '@playwright/test';

test.describe('Home page', () => {
  test('loads and shows the hero section', async ({page}) => {
    await page.goto('/en');
    await expect(page.getByRole('heading', {name: '922-Studio'})).toBeVisible();
  });

  test('shows tagline text', async ({page}) => {
    await page.goto('/en');
    await expect(page.getByText('A small group of hobby developers building real things.')).toBeVisible();
  });

  test('shows collaborators section', async ({page}) => {
    await page.goto('/en');
    await expect(page.getByRole('heading', {name: 'The Team'})).toBeVisible();
    await expect(page.getByText('Gregor Krykon')).toBeVisible();
    await expect(page.getByText('Iustus Krykon')).toBeVisible();
  });

  test('shows timeline section', async ({page}) => {
    await page.goto('/en');
    await expect(page.getByRole('heading', {name: 'Timeline'})).toBeVisible();
    await expect(page.getByText('3-Server Lab Expansion')).toBeVisible();
  });

  test('shows projects section', async ({page}) => {
    await page.goto('/en');
    await expect(page.getByRole('heading', {name: 'Projects'})).toBeVisible();
    await expect(page.getByText('HomeAPI')).toBeVisible();
  });
});
