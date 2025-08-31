import { describe, it, expect, beforeEach } from 'vitest';
import { POST } from '../../app/api/telemetry/route';
import { db } from '../../lib/db/adapter';

describe('telemetry route', () => {
  beforeEach(() => {
    if ((db as any).events) {
      (db as any).events.length = 0;
    }
  });

  it('rejects invalid payload', async () => {
    const req = new Request('http://localhost/api/telemetry', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('inserts event', async () => {
    const req = new Request('http://localhost/api/telemetry', {
      method: 'POST',
      body: JSON.stringify({ event: 'test', ts: 1 }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect((db as any).events.length).toBe(1);
  });
});

