export type Detection = {
  type: 'EMAIL' | 'SSN' | 'CREDIT_CARD';
  start: number;
  end: number;
  value: string;
};

const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;
const ccRegex = /\b(?:\d[ -]*?){13,16}\b/g;

export function isEmail(value: string): boolean {
  emailRegex.lastIndex = 0;
  return emailRegex.test(value);
}

export function isSSN(value: string): boolean {
  ssnRegex.lastIndex = 0;
  return ssnRegex.test(value);
}

function luhnCheck(num: string): boolean {
  let sum = 0;
  let shouldDouble = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export function isCreditCard(value: string): boolean {
  const digits = value.replace(/[^0-9]/g, '');
  if (digits.length < 13 || digits.length > 16) return false;
  return luhnCheck(digits);
}

export function findAll(text: string): Detection[] {
  const results: Detection[] = [];

  for (const match of text.matchAll(emailRegex)) {
    results.push({
      type: 'EMAIL',
      start: match.index || 0,
      end: (match.index || 0) + match[0].length,
      value: match[0],
    });
  }

  for (const match of text.matchAll(ssnRegex)) {
    results.push({
      type: 'SSN',
      start: match.index || 0,
      end: (match.index || 0) + match[0].length,
      value: match[0],
    });
  }

  for (const match of text.matchAll(ccRegex)) {
    const digits = match[0].replace(/[^0-9]/g, '');
    if (digits.length >= 13 && digits.length <= 16 && luhnCheck(digits)) {
      results.push({
        type: 'CREDIT_CARD',
        start: match.index || 0,
        end: (match.index || 0) + match[0].length,
        value: match[0],
      });
    }
  }

  results.sort((a, b) => a.start - b.start);
  return results;
}
