import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { writeAudit } from '../lib/audit/logger';

async function main() {
  const days = parseInt(process.env.TELEMETRY_RETENTION_DAYS || '30', 10);
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const dir = path.join(process.cwd(), '.data', 'telemetry');
  const file = path.join(dir, 'events.ndjson');
  let content: string;
  try {
    content = await fs.readFile(file, 'utf-8');
  } catch {
    console.log('no telemetry data');
    return;
  }
  const lines = content.split('\n').filter(Boolean);
  const keep: string[] = [];
  const reqId = crypto.randomUUID();
  for (const line of lines) {
    try {
      const event = JSON.parse(line);
      if (event.ts < cutoff) {
        await writeAudit({ action: 'delete', requestId: reqId, timestamp: Date.now(), record: event });
      } else {
        keep.push(line);
      }
    } catch {
      keep.push(line);
    }
  }
  await fs.writeFile(file, keep.join('\n') + (keep.length ? '\n' : ''));
}

main();
