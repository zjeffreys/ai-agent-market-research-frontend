import { readFile, writeFile } from 'fs/promises';
import path from 'path';

async function main() {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.error('LEAD_WEBHOOK_URL is not set');
    process.exit(1);
  }

  const file = path.join(process.cwd(), '.data', 'leads', 'pending.ndjson');
  let data: string;
  try {
    data = await readFile(file, 'utf-8');
  } catch {
    console.log('No pending leads');
    return;
  }

  const lines = data.split('\n').filter(Boolean);
  const remaining: string[] = [];

  for (const line of lines) {
    try {
      const payload = JSON.parse(line);
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        console.log('Sent', payload.email);
      } else {
        remaining.push(line);
        console.error('Failed', payload.email, res.status);
      }
    } catch (err) {
      remaining.push(line);
      console.error('Error sending lead', err);
    }
  }

  await writeFile(file, remaining.join('\n') + (remaining.length ? '\n' : ''));
}

main();
