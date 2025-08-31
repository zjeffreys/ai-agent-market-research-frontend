import { describe, it, expect, beforeEach } from 'vitest';
import { POST } from '../../app/api/leads/route';
import { db } from '../../lib/db/adapter';

describe('leads route', () => {
  beforeEach(() => {
    if ((db as any).leads) {
      (db as any).leads.length = 0;
    }
  });

  it('rejects invalid payload', async () => {
    const req = new Request('http://localhost/api/leads', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('inserts lead', async () => {
    const req = new Request('http://localhost/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        email: 'a@example.com',
        company: 'Acme',
        size: '10',
        vertical: 'tech',
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
    expect((db as any).leads.length).toBe(1);
  });
});

