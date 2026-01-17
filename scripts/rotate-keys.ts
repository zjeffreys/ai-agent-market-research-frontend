import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { writeAudit } from '../lib/audit/logger';

function hashKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex');
}

async function main() {
  const dir = path.join(process.cwd(), '.data', 'keys');
  await fs.mkdir(dir, { recursive: true });
  const current = path.join(dir, 'current.key');
  const reqId = crypto.randomUUID();

  try {
    const oldKey = await fs.readFile(current, 'utf-8');
    const backup = path.join(dir, `backup-${Date.now()}.key`);
    await fs.writeFile(backup, oldKey);
    await writeAudit({
      action: 'delete',
      requestId: reqId,
      timestamp: Date.now(),
      record: { keyHash: hashKey(oldKey), backup: path.basename(backup) },
    });
  } catch {
    // no existing key
  }

  const newKey = crypto.randomBytes(32).toString('hex');
  await fs.writeFile(current, newKey);
  await writeAudit({
    action: 'create',
    requestId: reqId,
    timestamp: Date.now(),
    record: { keyHash: hashKey(newKey) },
  });
}

main();
