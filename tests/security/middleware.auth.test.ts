import { describe, it, expect, beforeEach } from 'vitest';
import middleware, { _resetRateLimit } from '../../middleware';
import { NextRequest } from 'next/server';

function makeReq(headers: Record<string, string> = {}) {
  return new NextRequest('http://localhost/api/leads', { headers });
}

describe('middleware auth', () => {
  beforeEach(() => {
    _resetRateLimit();
    process.env.SGAI_API_KEY = 'test';
  });

  it('rejects missing key', async () => {
    const res = await middleware(makeReq());
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe('Unauthorized');
    expect(res.headers.get('X-Request-ID')).toBeTruthy();
  });

  it('allows valid key', async () => {
    const res = await middleware(
      makeReq({ Authorization: 'Bearer test', 'x-forwarded-for': '1.1.1.1' })
    );
    expect(res.status).toBe(200);
  });
});
