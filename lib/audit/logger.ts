import { promises as fs } from 'fs';
import path from 'path';

export interface AuditEntry {
  action: 'create' | 'delete';
  requestId: string;
  timestamp: number;
  record: any;
}

export async function writeAudit(entry: AuditEntry): Promise<void> {
  const dir = path.join(process.cwd(), '.logs');
  await fs.mkdir(dir, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const file = path.join(dir, `audit-${date}.jsonl`);
  await fs.appendFile(file, JSON.stringify(entry) + '\n');
}
