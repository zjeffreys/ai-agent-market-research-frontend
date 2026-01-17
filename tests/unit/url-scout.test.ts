import { describe, it, expect } from 'vitest';
import { crawlSite, Fetcher } from '../../lib/url-scout';

describe('URL Scout crawler', () => {
  it('stops crawling when max depth reached', async () => {
    const pages: Record<string, string> = {
      'http://example.com': '<a href="http://example.com/a">A</a><a href="http://example.com/b">B</a>',
      'http://example.com/a': '<a href="http://example.com/c">C</a>',
      'http://example.com/b': '<a href="http://example.com/d">D</a>',
      'http://example.com/c': '',
      'http://example.com/d': ''
    };

    const called: string[] = [];
    const fetcher: Fetcher = async (url: string) => {
      called.push(url);
      return pages[url] || '';
    };

    const result = await crawlSite('http://example.com', 1, fetcher);

    expect(result.discoveredUrls).toEqual([
      'http://example.com',
      'http://example.com/a',
      'http://example.com/b'
    ]);
    expect(called).toEqual(['http://example.com']);
import { describe, expect, it } from 'vitest';
import { urlScout } from '../../lib/url-scout';

describe('urlScout', () => {
  it('stops crawling at depth 3', async () => {
    const pages: Record<string, string> = {
      'http://example.com/': '<a href="/1">1</a>',
      'http://example.com/1': '<a href="/2">2</a>',
      'http://example.com/2': '<a href="/3">3</a>',
      'http://example.com/3': '<a href="/4">4</a>',
      'http://example.com/4': '<a href="/5">5</a>',
    };

    const fetched: string[] = [];
    const fetchStub = async (url: string) => {
      fetched.push(url);
      return {
        text: async () => pages[url] ?? '',
      } as any;
    };

    const result = await urlScout('http://example.com/', 3, fetchStub);

    expect(fetched).not.toContain('http://example.com/4');
    expect(result.discoveredUrls).not.toContain('http://example.com/4');
    expect(result.discoveredUrls).toHaveLength(4);
  });
});
