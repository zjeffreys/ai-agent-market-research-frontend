import { promises as fs } from 'fs';
import path from 'path';

export interface AuditEntry {
  action: 'create' | 'delete' | 'approve';
  requestId: string;
  timestamp: number;
  record: any;
}

function getDepth(value: any, depth = 0): number {
  if (value && typeof value === 'object') {
    return Object.values(value).reduce(
      (max, v) => Math.max(max, getDepth(v, depth + 1)),
      depth + 1
    );
  }
  return depth;
}

export async function writeAudit(entry: AuditEntry): Promise<void> {
  const dir = path.join(process.cwd(), '.logs');
  await fs.mkdir(dir, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const file = path.join(dir, `audit-${date}.jsonl`);
  const depth = getDepth(entry.record);
  if (depth > 2) {
    console.warn(`audit record depth ${depth} exceeds 2`);
  }
  await fs.appendFile(file, JSON.stringify(entry) + '\n');
}
