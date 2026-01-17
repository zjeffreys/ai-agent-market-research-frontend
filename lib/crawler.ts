export interface CrawlOptions {
  baseUrl: string;
  maxDepth: number;
  log?: (depth: number) => void;
}

/**
 * Simple crawler that logs the current depth before visiting a level.
 * It does not perform any network requests – depth logging is the
 * only side effect and enables easy verification in tests.
 */
export async function crawl({ baseUrl, maxDepth, log = () => {} }: CrawlOptions): Promise<void> {
  for (let depth = 0; depth <= maxDepth; depth++) {
    log(depth);
  }
import { env } from './env';

export type FetchLike = (url: string) => Promise<{
  ok: boolean;
  text(): Promise<string>;
}>;

export async function crawl(
  baseUrl: string,
  fetcher: FetchLike = fetch as any
): Promise<string[]> {
  const origin = new URL(baseUrl).origin;
  const visited = new Set<string>();
  const queue: Array<{ url: string; depth: number }> = [
    { url: baseUrl, depth: 0 },
  ];

  while (queue.length) {
    const { url, depth } = queue.shift()!;
    if (visited.has(url) || depth > env.MAX_DEPTH) continue;
    visited.add(url);
    if (depth === env.MAX_DEPTH) continue;

    let html = '';
    try {
      const res = await fetcher(url);
      if (!res.ok) continue;
      html = await res.text();
    } catch {
      continue;
    }

    const linkRegex = /href="(.*?)"/g;
    for (const match of html.matchAll(linkRegex)) {
      try {
        const nextUrl = new URL(match[1], url).toString();
        if (!nextUrl.startsWith(origin)) continue;
        if (!visited.has(nextUrl)) {
          queue.push({ url: nextUrl, depth: depth + 1 });
        }
      } catch {
        // ignore invalid URLs
      }
    }
  }

  return Array.from(visited);
}

export interface Page {
  url: string;
  links: string[];
}

export type FetchPage = (url: string) => Promise<Page> | Page;

/**
 * Crawl starting from `startUrl` using provided `fetchPage` callback.
 * The crawler stops when `pageLimit` pages have been visited.
 */
export async function crawl(
  startUrl: string,
  fetchPage: FetchPage,
  pageLimit: number
): Promise<Page[]> {
  const visited = new Set<string>();
  const result: Page[] = [];
  const queue: string[] = [startUrl];

  while (queue.length > 0 && visited.size < pageLimit) {
    const url = queue.shift()!;
    if (visited.has(url)) continue;
    const page = await fetchPage(url);
    visited.add(url);
    result.push(page);
    for (const link of page.links) {
      if (!visited.has(link)) {
        queue.push(link);
      }
    }
  }
  return result;
}
