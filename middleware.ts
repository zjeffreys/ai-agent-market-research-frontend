import { NextRequest, NextResponse } from 'next/server';
import { getRequestId, jsonError, withSecurityHeaders } from './lib/security';

const RATE_LIMIT = 60;
const WINDOW_MS = 5 * 60 * 1000;
const MAX_ENTRIES = 1000;
const hits = new Map<string, number[]>();

function record(ip: string, now: number) {
  let timestamps = hits.get(ip) || [];
  timestamps = timestamps.filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  if (hits.size > MAX_ENTRIES) {
    const oldest = hits.keys().next().value;
    hits.delete(oldest);
  }
  return timestamps;
}

export default function middleware(req: NextRequest) {
  const requestId = getRequestId(req);
  const expected = `Bearer ${process.env.SGAI_API_KEY}`;
  const auth = req.headers.get('authorization');
  if (auth !== expected) {
    return jsonError(401, 'Unauthorized', requestId);
  }

  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const timestamps = record(ip, now);
  const recent = timestamps.filter((t) => now - t < WINDOW_MS);
  if (recent.length > RATE_LIMIT) {
    const retry = Math.ceil((WINDOW_MS - (now - recent[0])) / 1000);
    return jsonError(429, 'Rate limit exceeded', requestId, {
      'Retry-After': String(retry),
    });
  }

  return withSecurityHeaders(NextResponse.next(), requestId);
}

export const config = {
  matcher: ['/api/(leads|telemetry|pii|pdf)/:path*'],
};

export function _resetRateLimit() {
  hits.clear();
}
