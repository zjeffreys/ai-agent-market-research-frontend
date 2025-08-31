import { NextResponse } from 'next/server';
import incidents from '@/data/incidents.json';
import policies from '@/data/policies.json';
import approvals from '@/data/approvals.json';
import pricing from '@/data/pricing.json';

export async function GET(
  request: Request,
  { params }: { params: { resource: string } }
) {
  const map: Record<string, any> = { incidents, policies, approvals, pricing };
  const data = map[params.resource] || [];
  await new Promise((res) => setTimeout(res, 200));
  return NextResponse.json(data);
}
