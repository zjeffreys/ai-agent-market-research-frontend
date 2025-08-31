import { describe, it, expect } from 'vitest';
import { isEmail, isSSN, isCreditCard, findAll } from '../../lib/detectors2';

describe('detectors2 individual checks', () => {
  it('validates emails', () => {
    expect(isEmail('user@example.com')).toBe(true);
    expect(isEmail('bad@example')).toBe(false);
  });

  it('validates SSNs', () => {
    expect(isSSN('123-45-6789')).toBe(true);
    expect(isSSN('123456789')).toBe(false);
  });

  it('validates credit cards via luhn', () => {
    expect(isCreditCard('4111 1111 1111 1111')).toBe(true);
    expect(isCreditCard('4111 1111 1111 1112')).toBe(false);
  });
});

describe('detectors2 findAll', () => {
  it('detects multiple entities', () => {
    const text = 'Email user@example.com SSN 123-45-6789 card 4111-1111-1111-1111';
    const detections = findAll(text);
    expect(detections.map((d) => d.type)).toEqual([
      'EMAIL',
      'SSN',
      'CREDIT_CARD',
    ]);
  });

  it('handles overlaps', () => {
    const text = 'Contact 123-45-6789@example.com now';
    const detections = findAll(text);
    expect(detections.some((d) => d.type === 'EMAIL')).toBe(true);
    expect(detections.some((d) => d.type === 'SSN')).toBe(true);
  });

  it('returns empty for none', () => {
    expect(findAll('nothing here').length).toBe(0);
  });
});
