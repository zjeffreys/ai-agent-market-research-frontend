import { describe, it, expect } from 'vitest';
import { maskEmail, maskPhone, maskSSN, maskName } from '../../lib/privacy/mask';

describe('mask', () => {
  it('masks email deterministically', () => {
    const a = maskEmail('user@example.com');
    const b = maskEmail('user@example.com');
    expect(a).toBe(b);
    expect(a.endsWith('om')).toBe(true);
  });

  it('masks phone deterministically', () => {
    const a = maskPhone('123-456-7890');
    const b = maskPhone('123-456-7890');
    expect(a).toBe(b);
    expect(a.endsWith('90')).toBe(true);
  });

  it('masks ssn deterministically', () => {
    const a = maskSSN('111-22-3333');
    const b = maskSSN('111-22-3333');
    expect(a).toBe(b);
    expect(a.endsWith('33')).toBe(true);
  });

  it('masks name deterministically', () => {
    const a = maskName('Alice');
    const b = maskName('Alice');
    expect(a).toBe(b);
    expect(a.endsWith('ce')).toBe(true);
  });
});
