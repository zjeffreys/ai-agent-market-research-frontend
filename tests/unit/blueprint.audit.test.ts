import { describe, it, expect, vi } from 'vitest';

vi.mock('../../lib/audit/logger', () => ({ writeAudit: vi.fn() }));

import { approveBlueprint } from '../../lib/blueprint';
import { writeAudit } from '../../lib/audit/logger';

describe('approveBlueprint', () => {
  it('writes approval to audit log', async () => {
    await approveBlueprint('bp-1', 'alice');
    expect(writeAudit).toHaveBeenCalledTimes(1);
    const entry = (writeAudit as any).mock.calls[0][0];
    expect(entry.action).toBe('approve');
    expect(entry.record).toEqual({ blueprintId: 'bp-1', approvedBy: 'alice' });
  });
});
