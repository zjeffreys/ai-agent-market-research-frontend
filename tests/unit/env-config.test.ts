import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const originalEnv = { ...process.env };

describe('env config', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    process.env.PUBLIC_SITE_URL = 'https://example.com';
    process.env.VITE_SUPABASE_URL = 'https://db.example.com';
    process.env.VITE_SUPABASE_ANON_KEY = 'anon';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'secret';
    process.env.VITE_SCRAPER_API_BASE_URL = 'https://scraper.example.com';
    process.env.OPENAI_API_KEY = 'openai';
    process.env.DB_DRIVER = 'memory';
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('does not expose service role key', async () => {
    const { env } = await import('../../lib/env');
    expect(process.env.SUPABASE_SERVICE_ROLE_KEY).toBe('secret');
    expect('SUPABASE_SERVICE_ROLE_KEY' in env).toBe(false);
  });
});

