import crypto from 'crypto';

const SALT = process.env.PRIVACY_SALT || 'sg-default-salt';

function maskValue(value: string): string {
  const hash = crypto.createHash('sha256').update(SALT + value).digest('hex');
  const tail = value.slice(-2);
  return `${hash}${tail}`;
}

export function maskEmail(email: string): string {
  return maskValue(email);
}

export function maskPhone(phone: string): string {
  return maskValue(phone);
}

export function maskSSN(ssn: string): string {
  return maskValue(ssn);
}

export function maskName(name: string): string {
  return maskValue(name);
}
