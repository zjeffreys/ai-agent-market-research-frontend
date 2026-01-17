import { NextResponse } from 'next/server';
import { TelemetryEventSchema } from '../../../schemas/telemetry';
import { db } from '../../../lib/db/adapter';
import { containsServiceRoleKey } from '../../../lib/security';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (containsServiceRoleKey(body)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    const event = TelemetryEventSchema.parse({ ts: Date.now(), ...body });
    await db.insertTelemetry(event);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

