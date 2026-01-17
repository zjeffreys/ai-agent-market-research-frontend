import { promises as fs } from 'fs';
import path from 'path';
import { writeAudit } from '../lib/audit/logger';

async function main() {
  const [, , crawlId] = process.argv;
  if (!crawlId) {
    console.error('Usage: ts-node scripts/monitor-crawl.ts <crawlId>');
    process.exit(1);
  }

  const file = path.join(process.cwd(), '.data', 'crawls', `${crawlId}.ndjson`);
  let content: string;
  try {
    content = await fs.readFile(file, 'utf-8');
  } catch {
    console.error('no crawl data for', crawlId);
    return;
  }

  const urls = new Set<string>();
  for (const line of content.split('\n')) {
    if (!line.trim()) continue;
    try {
      const entry = JSON.parse(line);
      if (typeof entry === 'string') {
        urls.add(entry);
      } else if (Array.isArray(entry.discoveredUrls)) {
        for (const u of entry.discoveredUrls) {
          if (typeof u === 'string') urls.add(u);
        }
      } else if (entry.url) {
        urls.add(entry.url);
      }
    } catch {
      // ignore malformed lines
    }
  }

  const count = urls.size;
  console.log(`crawl ${crawlId} unique URLs: ${count}`);
  await writeAudit({
    action: 'create',
    requestId: crawlId,
    timestamp: Date.now(),
    record: { crawlId, uniqueUrls: count },
  });
}

main();
