import { describe, it, expect, vi } from 'vitest';
import { createCostLogger } from '../../lib/telemetry/costLogger';

describe('cost logger', () => {
  it('warns when spend reaches 80% of budget', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const logger = createCostLogger(100);

    logger(50);
    expect(warn).not.toHaveBeenCalled();

    logger(30);
    expect(warn).toHaveBeenCalledTimes(1);

    logger(10);
    expect(warn).toHaveBeenCalledTimes(1);

    warn.mockRestore();
    log.mockRestore();
  });
});
