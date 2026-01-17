import { describe, it, expect, beforeEach } from 'vitest';
import { logTokenUsage } from '../../lib/telemetry/token';
import { db } from '../../lib/db/adapter';

describe('token usage logging', () => {
  beforeEach(() => {
    if ((db as any).tokenUsage) {
      (db as any).tokenUsage.length = 0;
    }
  });

  it('stores token usage with timestamp', async () => {
    const before = Date.now();
    await logTokenUsage('analysis1', 123);
    const records = (db as any).tokenUsage;
    expect(records.length).toBe(1);
    expect(records[0].analysisId).toBe('analysis1');
    expect(records[0].tokens).toBe(123);
    expect(records[0].ts).toBeGreaterThanOrEqual(before);
  });
});

