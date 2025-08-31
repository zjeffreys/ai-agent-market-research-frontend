import { describe, it, expect } from 'vitest';
import { POLICY_PACKS, loadPolicyPack } from '../../lib/policy-packs';

describe('policy packs', () => {
  it('loads and validates all packs', async () => {
    for (const name of POLICY_PACKS) {
      const pack = await loadPolicyPack(name);
      expect(Array.isArray(pack)).toBe(true);
      expect(pack.length).toBeGreaterThan(0);
      for (const rule of pack) {
        expect(rule).toHaveProperty('id');
        expect(rule).toHaveProperty('name');
        expect(rule).toHaveProperty('matchers');
        expect(rule).toHaveProperty('action');
        expect(rule).toHaveProperty('severity');
      }
    }
  });
});
