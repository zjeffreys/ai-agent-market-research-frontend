import { describe, it, expect } from 'vitest';
import { detectEntities, applyRedaction } from '../../lib/redaction';

describe('redaction', () => {
  it('detects SSN and credit card', () => {
    const text = 'SSN 123-45-6789 card 4111 1111 1111 1111';
    const { entities } = detectEntities(text);
    expect(entities.some((e) => e.type === 'SSN')).toBe(true);
    expect(entities.some((e) => e.type === 'CREDIT_CARD')).toBe(true);
  });

  it('masks entities', () => {
    const text = 'SSN 123-45-6789';
    const { entities } = detectEntities(text);
    const { sanitized } = applyRedaction(text, entities, 'mask');
    expect(sanitized).toContain('***-**-6789');
  });
});
