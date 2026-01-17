import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export function getRequestId(req: Request): string {
  return req.headers.get('x-request-id') || randomUUID();
}

export function withSecurityHeaders(res: NextResponse, requestId: string) {
  res.headers.set('X-Request-ID', requestId);
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

export function jsonError(
  status: number,
  message: string,
  requestId: string,
  headers: Record<string, string> = {}
) {
  const res = withSecurityHeaders(
    NextResponse.json({ error: message, requestId }, { status }),
    requestId
  );
  for (const [k, v] of Object.entries(headers)) {
    res.headers.set(k, v);
  }
  return res;
}

export function containsServiceRoleKey(payload: unknown): boolean {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return false;
  try {
    return JSON.stringify(payload).includes(key);
  } catch {
    return false;
  }
}
