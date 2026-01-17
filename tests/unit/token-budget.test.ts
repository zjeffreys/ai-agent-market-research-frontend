import { describe, it, expect } from 'vitest';
import { TokenBudget } from '../../lib/token-budget';
import { analyze } from '../../lib/analysis';

describe('token budget', () => {
  it('allows analysis within limit', () => {
    const budget = new TokenBudget(10);
    const result = analyze('within limit', budget);
    expect(result.tokens).toBeGreaterThan(0);
  });

  it('aborts analysis when limit exceeded', () => {
    const budget = new TokenBudget(5);
    expect(() => analyze('this sentence has more than five tokens', budget)).toThrow(
      /Token budget exceeded/
    );
  });
});
