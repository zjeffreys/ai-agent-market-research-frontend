import { describe, it, expect, vi } from 'vitest';
import { crawl } from '../../lib/crawler';

describe('crawler', () => {
  it('logs depth for each crawl level', async () => {
    const logger = vi.fn();
    await crawl({ baseUrl: 'http://example.com', maxDepth: 2, log: logger });
    expect(logger.mock.calls).toEqual([[0], [1], [2]]);
  });
});
import { describe, it, expect, beforeEach, vi } from 'vitest';

// ensure env variables are set before importing crawler
function setEnv() {
  process.env.PUBLIC_SITE_URL = 'http://example.com';
  process.env.VITE_SUPABASE_URL = 'http://example.com';
  process.env.VITE_SUPABASE_ANON_KEY = 'anon';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'role';
  process.env.VITE_SCRAPER_API_BASE_URL = 'http://api.example.com';
  process.env.OPENAI_API_KEY = 'key';
  process.env.DB_DRIVER = 'memory';
  process.env.MAX_DEPTH = '1';
}

describe('crawler max depth', () => {
  beforeEach(() => {
    setEnv();
    vi.resetModules();
  });

  it('stops at the configured depth', async () => {
    const pages: Record<string, string> = {
      'http://example.com/': '<a href="/a">A</a>',
      'http://example.com/a': '<a href="/b">B</a>',
      'http://example.com/b': '',
    };

    const fetcher = async (url: string) => ({
      ok: true,
      text: async () => pages[url] || '',
    });

    const { crawl } = await import('../../lib/crawler');
    const result = await crawl('http://example.com/', fetcher as any);
    expect(result).toEqual([
      'http://example.com/',
      'http://example.com/a',
    ]);
  });
});

import { describe, it, expect } from 'vitest';
import { crawl, FetchPage, Page } from '../../lib/crawler';

describe('crawler', () => {
  it('stops when page count exceeds limit', async () => {
    const fetchHistory: string[] = [];
    const fetchPage: FetchPage = async (url: string): Promise<Page> => {
      fetchHistory.push(url);
      const id = Number(url.replace('page', ''));
      return { url, links: [`page${id + 1}`] };
    };

    const pages = await crawl('page1', fetchPage, 3);

    expect(pages.map((p) => p.url)).toEqual(['page1', 'page2', 'page3']);
    expect(fetchHistory).toEqual(['page1', 'page2', 'page3']);
  });
});

