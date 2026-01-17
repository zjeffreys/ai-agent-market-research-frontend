export type Entity = {
  type: 'SSN' | 'CREDIT_CARD' | 'EMAIL';
  start: number;
  end: number;
  preview: string;
  confidence: number;
};

const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;
const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const ccRegex = /\b(?:\d[ -]*?){13,16}\b/g;

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

export function detectEntities(text: string): { entities: Entity[] } {
  const entities: Entity[] = [];

  for (const match of text.matchAll(ssnRegex)) {
    entities.push({
      type: 'SSN',
      start: match.index || 0,
      end: (match.index || 0) + match[0].length,
      preview: match[0],
      confidence: 0.99,
    });
  }

  for (const match of text.matchAll(emailRegex)) {
    entities.push({
      type: 'EMAIL',
      start: match.index || 0,
      end: (match.index || 0) + match[0].length,
      preview: match[0],
      confidence: 0.95,
    });
  }

  for (const match of text.matchAll(ccRegex)) {
    const digits = match[0].replace(/[^0-9]/g, '');
    if (digits.length >= 13 && digits.length <= 16 && luhnCheck(digits)) {
      entities.push({
        type: 'CREDIT_CARD',
        start: match.index || 0,
        end: (match.index || 0) + match[0].length,
        preview: match[0],
        confidence: 0.98,
      });
    }
  }

  entities.sort((a, b) => a.start - b.start);
  return { entities };
}

export function applyRedaction(
  text: string,
  entities: Entity[],
  strategy: 'mask' | 'token'
): { sanitized: string } {
  let result = '';
  let cursor = 0;
  for (const e of entities) {
    result += text.slice(cursor, e.start);
    const raw = text.slice(e.start, e.end);
    if (strategy === 'token') {
      result += `[${e.type}_REDACTED]`;
    } else {
      // mask
      if (e.type === 'CREDIT_CARD') {
        const digits = raw.replace(/[^0-9]/g, '');
        result += '**** **** **** ' + digits.slice(-4);
      } else if (e.type === 'SSN') {
        result += '***-**-' + raw.slice(-4);
      } else if (e.type === 'EMAIL') {
        result += '[EMAIL_REDACTED]';
      }
    }
    cursor = e.end;
  }
  result += text.slice(cursor);
  return { sanitized: result };
}
