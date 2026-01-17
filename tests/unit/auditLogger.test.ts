import { describe, it, expect, vi } from 'vitest';
import { writeAudit } from '../../lib/audit/logger';
import { rm } from 'fs/promises';
import path from 'path';

describe('writeAudit depth warning', () => {
  it('warns when record depth exceeds 2', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const entry = {
      action: 'create',
      requestId: 'req1',
      timestamp: Date.now(),
      record: { a: { b: { c: 1 } } },
    };
    await writeAudit(entry);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
    await rm(path.join(process.cwd(), '.logs'), { recursive: true, force: true });
  });
});
