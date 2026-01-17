import { describe, it, expect } from 'vitest';
import { crawl, PageLimitExceededError } from '../../lib/url-scout';

describe('url-scout page limit', () => {
  const pages: Record<string, string> = {
    'https://example.com/': '<a href="/a"></a><a href="/b"></a>',
    'https://example.com/a': '<a href="/c"></a>',
    'https://example.com/b': '',
    'https://example.com/c': '',
  };
  const fetcher = async (url: string) => pages[url] ?? '';

  it('aborts when page limit exceeded', async () => {
    await expect(
      crawl({ baseUrl: 'https://example.com/', maxDepth: 3, maxPages: 3, fetchFn: fetcher })
    ).rejects.toBeInstanceOf(PageLimitExceededError);
  });

  it('returns results up to page limit', async () => {
    const res = await crawl({
      baseUrl: 'https://example.com/',
      maxDepth: 3,
      maxPages: 4,
      fetchFn: fetcher,
    });
    expect(res.total).toBe(4);
    expect(res.discoveredUrls).toContain('https://example.com/c');
  });
});
