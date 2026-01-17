export type Scope = {
  org?: string;
  domain?: string;
  urlPattern?: string;
};

export type MatcherType = 'email' | 'ssn' | 'cc' | 'custom';

export type Rule = {
  id: string;
  scope: Scope;
  matcher: MatcherType;
  customRegex?: string;
  action: 'block' | 'mask' | 'allow';
  severity: 'low' | 'medium' | 'high';
  explain: string;
};

const MATCHERS: Record<Exclude<MatcherType, 'custom'>, RegExp> = {
  email: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
  ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
  cc: /\b(?:\d[ -]*?){13,16}\b/g,
};

export function evaluate(text: string, rules: Rule[]) {
  const violations: { rule: Rule; matches: string[] }[] = [];
  let masked = text;

  for (const rule of rules) {
    let regex: RegExp | null = null;
    if (rule.matcher === 'custom' && rule.customRegex) {
      try {
        regex = new RegExp(rule.customRegex, 'g');
      } catch {
        regex = null;
      }
    } else if (rule.matcher !== 'custom') {
      regex = MATCHERS[rule.matcher];
    }

    if (regex) {
      const matches = text.match(regex) || [];
      if (matches.length) {
        violations.push({ rule, matches });
        if (rule.action === 'mask' || rule.action === 'block') {
          masked = masked.replace(regex, '***');
        }
      }
    }
  }

  return { violations, masked };
}

const STORAGE_KEY = 'policy2.rules';

export function loadRules(): Rule[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRules(rules: Rule[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
  window.dispatchEvent(new Event('policy2:rules'));
}
