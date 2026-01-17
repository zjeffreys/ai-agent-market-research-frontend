import { z } from 'zod';

export const TokenUsageSchema = z.object({
  analysisId: z.string().min(1),
  tokens: z.number().int().nonnegative(),
  ts: z.number().int(),
});

export type TokenUsage = z.infer<typeof TokenUsageSchema>;

