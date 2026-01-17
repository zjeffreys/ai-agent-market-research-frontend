import fs from 'fs';
import path from 'path';

const filePath = path.resolve('.env.example');
const content = fs.readFileSync(filePath, 'utf8');

// Parse lines ignoring comments and blank lines
const lines = content.split(/\r?\n/).filter((line) => line && !line.trim().startsWith('#'));

const entries: Record<string, string> = {};
for (const line of lines) {
  const [key, ...rest] = line.split('=');
  const value = rest.join('=').trim().replace(/^"|"$/g, '');
  entries[key.trim()] = value;
}

const checks: Record<string, (val: string) => boolean> = {
  OPENAI_API_KEY: (val) => /^sk-[a-zA-Z0-9]{20,}$/.test(val),
  SUPABASE_SERVICE_ROLE_KEY: (val) => /^[A-Za-z0-9._-]{20,}$/.test(val),
  VITE_SUPABASE_ANON_KEY: (val) => /^[A-Za-z0-9._-]{20,}$/.test(val),
  VITE_SUPABASE_URL: (val) => !val.includes('your-project'),
  VITE_SCRAPER_API_BASE_URL: (val) => !/localhost|example\.com/.test(val),
  LEAD_WEBHOOK_URL: (val) => val !== '' && !val.includes('example'),
};

const offenders: string[] = [];
for (const [key, validator] of Object.entries(checks)) {
  const value = entries[key];
  if (value && validator(value)) {
    offenders.push(`${key} appears to contain a real value`);
  }
}

if (offenders.length) {
  console.error('.env.example contains potential secrets:\n' + offenders.join('\n'));
  process.exit(1);
}

console.log('.env.example validated successfully');

