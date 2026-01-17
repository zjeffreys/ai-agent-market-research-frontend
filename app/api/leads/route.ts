import { NextResponse } from 'next/server';
import { LeadSchema } from '../../../schemas/lead';
import { db } from '../../../lib/db/adapter';
import { containsServiceRoleKey } from '../../../lib/security';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (containsServiceRoleKey(body)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    const lead = LeadSchema.parse(body);
    if (!lead.approved) {
      return NextResponse.json({ error: 'Lead not approved' }, { status: 403 });
    }
    await db.insertLead(lead);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
