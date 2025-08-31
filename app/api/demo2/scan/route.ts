import { NextRequest, NextResponse } from 'next/server';

type Match = {
  type: string;
  match: string;
  index: number;
  severity: 'high' | 'medium' | 'low';
  suggestion: string;
};

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

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const matches: Match[] = [];

  const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
  const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;
  const ccRegex = /\b(?:\d[ -]*?){13,16}\b/g;

  for (const m of text.matchAll(emailRegex)) {
    matches.push({
      type: 'Email',
      match: m[0],
      index: m.index || 0,
      severity: 'medium',
      suggestion: 'Remove email addresses',
    });
  }
  for (const m of text.matchAll(ssnRegex)) {
    matches.push({
      type: 'SSN',
      match: m[0],
      index: m.index || 0,
      severity: 'high',
      suggestion: 'Do not share SSNs',
    });
  }
  for (const m of text.matchAll(ccRegex)) {
    const digits = m[0].replace(/[ -]/g, '');
    if (luhnCheck(digits)) {
      matches.push({
        type: 'Credit Card',
        match: m[0],
        index: m.index || 0,
        severity: 'high',
        suggestion: 'Remove credit card numbers',
      });
    }
  }

  let redacted = text;
  matches
    .sort((a, b) => b.index - a.index)
    .forEach((m) => {
      redacted =
        redacted.slice(0, m.index) +
        '[REDACTED]' +
        redacted.slice(m.index + m.match.length);
    });

  return NextResponse.json({ redacted, matches });
}
