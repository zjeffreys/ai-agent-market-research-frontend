# Crawling

Guidelines for the URL Scout's traversal.

## Depth

- The crawl starts at the `baseUrl` (depth 0) and explores links breadth‑first.
- Each level of links increases the depth by one.
- Crawling stops when `maxDepth` is reached to avoid unbounded exploration.

## robots.txt

- Before visiting any page, the crawler fetches `/robots.txt`.
- URLs matching `Disallow` directives are skipped.
- If the file is unreachable, the crawler retries up to three times before aborting.
- Missing `robots.txt` is treated as no restrictions, but respectful crawling is encouraged.
