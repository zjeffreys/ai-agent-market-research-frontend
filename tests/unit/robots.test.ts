import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { filterAllowedUrls } from '../../lib/robots';

const robotsTxt = readFileSync(new URL('./mock/robots.txt', import.meta.url), 'utf8');

describe('robots.txt disallow rules', () => {
  it('filters out disallowed URLs', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(robotsTxt),
    });

    const base = 'https://example.com';
    const urls = [
      `${base}/`,
      `${base}/public/info`,
      `${base}/private/secret`,
    ];

    const allowed = await filterAllowedUrls(base, urls, mockFetch as any);
    expect(allowed).toEqual([`${base}/`, `${base}/public/info`]);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const calledWith = mockFetch.mock.calls[0][0];
    expect(String(calledWith)).toBe('https://example.com/robots.txt');
import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchIfAllowed } from '../../lib/robots';

const makeFetch = (robots: string) => {
  return vi.fn(async (input: any) => {
    const url = typeof input === 'string' ? input : input.toString();
    if (url.endsWith('/robots.txt')) {
      return new Response(robots, { status: 200 });
    }
    return new Response('ok', { status: 200 });
  });
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('fetchIfAllowed', () => {
  it('skips disallowed paths from robots.txt', async () => {
    const fetchMock = makeFetch('User-agent: *\nDisallow: /private');
    vi.stubGlobal('fetch', fetchMock as any);

    const res = await fetchIfAllowed('https://example.com/private/data');
    expect(res).toBeNull();
    const firstCall = fetchMock.mock.calls[0][0];
    expect(firstCall.toString()).toBe('https://example.com/robots.txt');
  });

  it('allows paths not disallowed', async () => {
    const fetchMock = makeFetch('User-agent: *\nDisallow: /private');
    vi.stubGlobal('fetch', fetchMock as any);

    const res = await fetchIfAllowed('https://example.com/public/info');
    expect(res).not.toBeNull();
  });

  it('honors allow overrides', async () => {
    const fetchMock = makeFetch('User-agent: *\nDisallow: /private\nAllow: /private/open');
    vi.stubGlobal('fetch', fetchMock as any);

    const res = await fetchIfAllowed('https://example.com/private/open/page');
    expect(res).not.toBeNull();
  });
});
