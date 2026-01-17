import { describe, it, expect, beforeEach } from 'vitest';
import middleware, { _resetRateLimit } from '../../middleware';
import { NextRequest } from 'next/server';

function makeReq() {
  return new NextRequest('http://localhost/api/leads', {
    headers: {
      Authorization: 'Bearer test',
      'x-forwarded-for': '2.2.2.2',
    },
  });
}

describe('middleware rate limit', () => {
  beforeEach(() => {
    _resetRateLimit();
    process.env.SGAI_API_KEY = 'test';
  });

  it('limits requests per ip', async () => {
    for (let i = 0; i < 60; i++) {
      const ok = await middleware(makeReq());
      expect(ok.status).toBe(200);
    }
    const res = await middleware(makeReq());
    expect(res.status).toBe(429);
    expect(res.headers.get('Retry-After')).toBeTruthy();
  });
});
