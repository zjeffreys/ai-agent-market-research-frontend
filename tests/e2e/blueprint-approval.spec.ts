import { test, expect } from '@playwright/test';

test('blueprint requires approval before delivery', async ({ page }) => {
  await page.goto('/approvals');
  await expect(page.locator('h1')).toHaveText('Approvals');
  const row = page.locator('tbody tr').first();
  await expect(row).toContainText('Blueprint');
  await expect(row).toContainText('medium');
});
