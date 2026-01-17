export async function filterAllowedUrls(
  baseUrl: string,
  urls: string[],
  fetchFn: typeof fetch = fetch
): Promise<string[]> {
  let disallow: string[] = [];
  try {
    const res = await fetchFn(new URL('/robots.txt', baseUrl));
    if ((res as any)?.ok) {
      const content = await (res as any).text();
      disallow = parseDisallow(content);
    }
  } catch {
    // ignore errors fetching robots
  }
  return urls.filter((u) => {
    const path = new URL(u).pathname;
    return !disallow.some((rule) => rule !== '' && path.startsWith(rule));
  });
}

function parseDisallow(content: string): string[] {
  const lines = content.split(/\r?\n/);
  const rules: string[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const [directive, value = ''] = line.split(':', 2).map((s) => s.trim());
    if (directive.toLowerCase() === 'disallow' && value) {
      rules.push(value);
    }
  }
  return rules;
export interface RobotsRules {
  allow: string[];
  disallow: string[];
}

async function fetchRobots(origin: string): Promise<RobotsRules> {
  try {
    const res = await fetch(new URL('/robots.txt', origin));
    if (!res.ok) return { allow: [], disallow: [] };
    const text = await res.text();
    const lines = text.split(/\r?\n/);
    const rules: RobotsRules = { allow: [], disallow: [] };
    let applies = false;
    for (const raw of lines) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const [directive, valueRaw] = line.split(':', 2);
      if (!directive || valueRaw === undefined) continue;
      const value = valueRaw.trim();
      const d = directive.toLowerCase();
      if (d === 'user-agent') {
        applies = value === '*';
      } else if (applies && d === 'disallow') {
        if (value) rules.disallow.push(value);
      } else if (applies && d === 'allow') {
        if (value) rules.allow.push(value);
      }
    }
    return rules;
  } catch {
    return { allow: [], disallow: [] };
  }
}

function pathAllowed(path: string, rules: RobotsRules): boolean {
  for (const dis of rules.disallow) {
    if (dis && path.startsWith(dis)) {
      for (const allow of rules.allow) {
        if (path.startsWith(allow)) return true;
      }
      return false;
    }
  }
  return true;
}

/**
 * Fetches a URL if allowed by robots.txt. Returns null when disallowed.
 */
export async function fetchIfAllowed(
  url: string,
  init?: RequestInit,
  cache = new Map<string, RobotsRules>()
): Promise<Response | null> {
  const u = new URL(url);
  let rules = cache.get(u.origin);
  if (!rules) {
    rules = await fetchRobots(u.origin);
    cache.set(u.origin, rules);
  }
  if (!pathAllowed(u.pathname, rules)) return null;
  return fetch(url, init);
}

export async function isAllowed(
  url: string,
  cache = new Map<string, RobotsRules>()
) {
  const u = new URL(url);
  let rules = cache.get(u.origin);
  if (!rules) {
    rules = await fetchRobots(u.origin);
    cache.set(u.origin, rules);
  }
  return pathAllowed(u.pathname, rules);
}
