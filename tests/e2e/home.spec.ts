import { test, expect } from '@playwright/test';

test('home page has hero text', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('The seatbelt for enterprise AI');
});
