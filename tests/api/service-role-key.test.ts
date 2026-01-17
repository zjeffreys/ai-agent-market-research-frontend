import { describe, it, expect } from 'vitest';
import { POST as leadWebhook } from '../../app/api/lead-webhook/route';
import { POST as roiPdf } from '../../app/api/roi2/pdf/route';
import { POST as scan } from '../../app/api/demo2/scan/route';

process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-key';

describe('service role key protection', () => {
  it('lead webhook rejects payload with key', async () => {
    const req = new Request('http://localhost/api/lead-webhook', {
      method: 'POST',
      body: JSON.stringify({
        name: 'a',
        email: 'a@example.com',
        company: 'c',
        notes: process.env.SUPABASE_SERVICE_ROLE_KEY,
      }),
    });
    const res = await leadWebhook(req);
    expect(res.status).toBe(400);
  });

  it('roi pdf rejects payload with key', async () => {
    const req = new Request('http://localhost/api/roi2/pdf', {
      method: 'POST',
      body: JSON.stringify({ key: process.env.SUPABASE_SERVICE_ROLE_KEY }),
    });
    const res = await roiPdf(req);
    expect(res.status).toBe(400);
  });

  it('demo2 scan rejects payload with key', async () => {
    const req = new Request('http://localhost/api/demo2/scan', {
      method: 'POST',
      body: JSON.stringify({ text: process.env.SUPABASE_SERVICE_ROLE_KEY }),
    });
    const res = await scan(req as any);
    expect(res.status).toBe(400);
  });
});
