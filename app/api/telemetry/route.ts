import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { maskEmail, maskPhone, maskSSN, maskName } from '@/lib/privacy/mask';
import { writeAudit } from '@/lib/audit/logger';

export interface TelemetryEvent {
  event: string;
  props?: Record<string, any>;
  ts: number;
  masked: boolean;
}

function maskProps(props: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = { ...props };
  if (typeof out.email === 'string') out.email = maskEmail(out.email);
  if (typeof out.phone === 'string') out.phone = maskPhone(out.phone);
  if (typeof out.ssn === 'string') out.ssn = maskSSN(out.ssn);
  if (typeof out.name === 'string') out.name = maskName(out.name);
  return out;
}

export async function POST(request: Request) {
  try {
    const { event, props = {}, ts = Date.now() } = await request.json();
    const maskedProps = maskProps(props);
    const payload: TelemetryEvent = { event, props: maskedProps, ts, masked: true };

    const dir = path.join(process.cwd(), '.data', 'telemetry');
    await fs.promises.mkdir(dir, { recursive: true });
    const file = path.join(dir, 'events.ndjson');
    await fs.promises.appendFile(file, JSON.stringify(payload) + '\n');

    const requestId = request.headers.get('x-request-id') || crypto.randomUUID();
    await writeAudit({ action: 'create', requestId, timestamp: Date.now(), record: payload });

    return NextResponse.json({ success: true });
  } catch {
import { TelemetryEventSchema } from '../../../schemas/telemetry';
import { db } from '../../../lib/db/adapter';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event = TelemetryEventSchema.parse({ ts: Date.now(), ...body });
    await db.insertTelemetry(event);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
