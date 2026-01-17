import { test, expect } from '@playwright/test';

test('crawler skips paths disallowed by robots.txt', async ({ page }) => {
  await page.route('**/robots.txt', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/plain',
      body: 'User-agent: *\nDisallow: /privacy\n',
    });
  });

  const requests: string[] = [];
  page.on('request', (req) => requests.push(req.url()));

  async function crawl(path: string) {
    const res = await page.goto('/robots.txt');
    const text = await res!.text();
    const disallows = text
      .split('\n')
      .filter((line) => line.startsWith('Disallow:'))
      .map((line) => line.replace('Disallow:', '').trim());
    if (disallows.some((d) => path.startsWith(d))) {
      return 'blocked';
    }
    await page.goto(path);
    return 'visited';
  }

  const blocked = await crawl('/privacy');
  expect(blocked).toBe('blocked');
  expect(requests).not.toContain('http://localhost:3000/privacy');

  const allowed = await crawl('/trust');
  expect(allowed).toBe('visited');
});
