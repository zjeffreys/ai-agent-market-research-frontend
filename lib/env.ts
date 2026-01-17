import { z } from 'zod';

const envSchema = z
const envSchema = z.object({
  PUBLIC_SITE_URL: z.string().url(),
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  VITE_SCRAPER_API_BASE_URL: z.string().url(),
  OPENAI_API_KEY: z.string().min(1),
  LEAD_WEBHOOK_URL: z.string().url().optional(),
});

if (typeof window !== 'undefined' && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY should not be exposed to the client');
}

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    'Missing required environment variables:',
    parsed.error.flatten().fieldErrors
  );
  throw new Error('Invalid environment variables');
}

  export const appEnv = parsed.data;
const schema = z
  .object({
    PUBLIC_SITE_URL: z.string().url(),
    VITE_SUPABASE_URL: z.string().url(),
    VITE_SUPABASE_ANON_KEY: z.string().min(1),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
    VITE_SCRAPER_API_BASE_URL: z.string().url(),
    OPENAI_API_KEY: z.string().min(1),
    LEAD_WEBHOOK_URL: z.string().url().optional(),
    MAX_DEPTH: z.coerce.number().int().min(0).default(2),
    DB_DRIVER: z.enum(['sqlite', 'memory']).default('sqlite'),
    DATABASE_URL: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.DB_DRIVER === 'sqlite' && !data.DATABASE_URL) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'DATABASE_URL is required when DB_DRIVER=sqlite',
        path: ['DATABASE_URL'],
      });
    }
  });

export const env = envSchema.parse(process.env);

