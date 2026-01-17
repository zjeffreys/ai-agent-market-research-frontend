export interface CrawlResult {
  discoveredUrls: string[];
}

export type Fetcher = (url: string) => Promise<string>;

// A simple breadth-first crawler that stops when maxDepth is reached.
export async function crawlSite(
  baseUrl: string,
  maxDepth: number,
  fetcher: Fetcher = defaultFetcher
): Promise<CrawlResult> {
  const visited = new Set<string>();
  const queue: Array<{ url: string; depth: number }> = [];
  const discovered: string[] = [];

  visited.add(baseUrl);
  queue.push({ url: baseUrl, depth: 0 });

  while (queue.length) {
    const { url, depth } = queue.shift()!;
    discovered.push(url);
    if (depth >= maxDepth) continue;
    try {
      const html = await fetcher(url);
      const links = extractLinks(html, baseUrl);
      for (const link of links) {
        if (!visited.has(link)) {
          visited.add(link);
          queue.push({ url: link, depth: depth + 1 });
        }
      }
    } catch {
      // ignore fetch errors in this simple implementation
    }
  }

  return { discoveredUrls: discovered };
}

async function defaultFetcher(url: string): Promise<string> {
import { randomUUID } from 'crypto';

export interface UrlScoutResult {
import crypto from 'node:crypto';

export interface CrawlConfig {
  baseUrl: string;
  maxDepth: number;
  maxPages?: number;
  fetchFn?: (url: string) => Promise<string>;
}

export interface CrawlResult {
  crawlId: string;
  discoveredUrls: string[];
  total: number;
}

export async function urlScout(
  baseUrl: string,
  maxDepth: number,
  fetchFn: (url: string) => Promise<{ text(): Promise<string> }>
): Promise<UrlScoutResult> {
  const visited = new Set<string>();
  const queue: Array<{ url: string; depth: number }> = [{ url: baseUrl, depth: 0 }];
  visited.add(baseUrl);

  while (queue.length > 0) {
    const { url, depth } = queue.shift()!;
    if (depth > maxDepth) continue;

    let html: string;
    try {
      const res = await fetchFn(url);
      html = await res.text();
    } catch {
      continue; // skip on fetch errors
    }

    if (depth === maxDepth) continue;

    const linkRegex = /href="(.*?)"/g;
    const matches = html.matchAll(linkRegex);
    for (const match of matches) {
      const href = match[1];
      if (!href) continue;
      try {
        const absolute = new URL(href, url).href;
        if (!visited.has(absolute) && !isAsset(absolute)) {
          visited.add(absolute);
          queue.push({ url: absolute, depth: depth + 1 });
        }
      } catch {
        // ignore invalid URLs
export class PageLimitExceededError extends Error {
  constructor(limit: number) {
    super(`Page limit exceeded: ${limit}`);
    this.name = 'PageLimitExceededError';
  }
}

async function defaultFetch(url: string): Promise<string> {
  const res = await fetch(url);
  return res.text();
}

function extractLinks(html: string, base: string): string[] {
  const links: string[] = [];
  const regex = /href="([^"]+)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      const resolved = new URL(match[1], base).toString();
      links.push(resolved);
    } catch {
      // skip invalid URLs
function extractLinks(html: string, origin: string): string[] {
  const links: string[] = [];
  const hrefRegex = /href="(.*?)"/g;
  for (const match of html.matchAll(hrefRegex)) {
    try {
      const href = match[1];
      const url = new URL(href, origin);
      if (url.origin === origin) {
        links.push(url.href);
      }
    } catch {
      // ignore invalid urls
    }
  }
  return links;
}

export async function crawl(config: CrawlConfig): Promise<CrawlResult> {
  const { baseUrl, maxDepth, maxPages = Infinity, fetchFn = defaultFetch } = config;
  const origin = new URL(baseUrl).origin;
  const queue: { url: string; depth: number }[] = [{ url: baseUrl, depth: 0 }];
  const visited = new Set<string>();

  while (queue.length) {
    const { url, depth } = queue.shift()!;
    if (visited.has(url)) continue;
    visited.add(url);
    if (visited.size > maxPages) {
      throw new PageLimitExceededError(maxPages);
    }
    if (depth >= maxDepth) continue;
    const html = await fetchFn(url);
    const links = extractLinks(html, origin);
    for (const link of links) {
      if (!visited.has(link)) {
        queue.push({ url: link, depth: depth + 1 });
      }
    }
  }

  return {
    crawlId: randomUUID(),
    crawlId: crypto.randomUUID(),
    discoveredUrls: Array.from(visited),
    total: visited.size,
  };
}

function isAsset(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|svg|css|js|pdf)$/i.test(url);
}

