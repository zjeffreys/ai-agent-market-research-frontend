import { NextResponse } from 'next/server';
import { appendFile, mkdir } from 'fs/promises';
import path from 'path';
import { containsServiceRoleKey } from '../../../lib/security';

interface LeadPayload {
  name: string;
  email: string;
  company: string;
  notes: string;
}

function isValidEmail(email: string): boolean {
  return /.+@.+\..+/.test(email);
}

async function savePending(payload: LeadPayload) {
  const dir = path.join(process.cwd(), '.data', 'leads');
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, 'pending.ndjson');
  await appendFile(file, JSON.stringify(payload) + '\n');
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LeadPayload>;
    if (containsServiceRoleKey(body)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    const { name, email, company, notes } = body;
    if (!name || !email || !company || !notes || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const payload: LeadPayload = { name, email, company, notes };
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          await savePending(payload);
          return NextResponse.json({ error: 'Webhook error' }, { status: 502 });
        }
      } catch {
        await savePending(payload);
        return NextResponse.json({ error: 'Webhook error' }, { status: 502 });
      }
      return NextResponse.json({ success: true }, { status: 200 });
    }

    await savePending(payload);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
