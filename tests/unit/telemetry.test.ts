import { describe, it, expect, beforeEach, vi } from 'vitest';
import { track, flush } from '../../lib/telemetry/client';
import { POST } from '../../app/api/telemetry/route';
import { db } from '../../lib/db/adapter';

describe('telemetry client', () => {
  const store: Record<string, string> = {};
  beforeEach(() => {
    Object.keys(store).forEach((k) => delete store[k]);
    globalThis.localStorage = {
      getItem: (k: string) => (k in store ? store[k] : null),
      setItem: (k: string, v: string) => {
        store[k] = v;
      },
      removeItem: (k: string) => {
        delete store[k];
      },
      clear: () => {
        Object.keys(store).forEach((k) => delete store[k]);
      },
    } as any;
    globalThis.fetch = vi.fn();
    globalThis.navigator = { onLine: true } as any;
  });

  it('buffers events when offline', async () => {
    navigator.onLine = false;
    await track('test');
    const buf = JSON.parse(localStorage.getItem('telemetry_buffer') || '[]');
    expect(buf.length).toBe(1);
  });

  it('flush sends buffered events', async () => {
    navigator.onLine = false;
    await track('test2');
    navigator.onLine = true;
    (fetch as any).mockResolvedValue({ ok: true });
    await flush();
    const buf = JSON.parse(localStorage.getItem('telemetry_buffer') || '[]');
    expect(buf.length).toBe(0);
    expect((fetch as any).mock.calls.length).toBe(1);
  });
});

describe('telemetry route', () => {
  beforeEach(() => {
    if ((db as any).events) {
      (db as any).events.length = 0;
    }
  });

  it('stores events via adapter', async () => {
    const req = new Request('http://localhost/api/telemetry', {
      method: 'POST',
      body: JSON.stringify({ event: 'api', props: { a: 1 }, ts: 1 }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect((db as any).events.length).toBe(1);
  });
});
