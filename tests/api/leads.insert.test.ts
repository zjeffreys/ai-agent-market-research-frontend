import { describe, it, expect, beforeEach } from 'vitest';
import { POST } from '../../app/api/leads/route';
import { db } from '../../lib/db/adapter';

process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-key';

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
        approved: true,
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
    expect((db as any).leads.length).toBe(1);
  });

  it('rejects payload containing service role key', async () => {
    const req = new Request('http://localhost/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        email: 'a@example.com',
        company: 'Acme',
        size: '10',
        vertical: 'tech',
        extra: process.env.SUPABASE_SERVICE_ROLE_KEY,
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  it('rejects unapproved lead', async () => {
    const req = new Request('http://localhost/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        email: 'b@example.com',
        company: 'Beta',
        size: '20',
        vertical: 'finance',
        approved: false,
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(403);
    expect((db as any).leads.length).toBe(0);
  });
});

