import { z } from 'zod';

export const LeadSchema = z.object({
  email: z.string().email(),
  company: z.string().min(1),
  size: z.string().min(1),
  vertical: z.string().min(1),
});

export type Lead = z.infer<typeof LeadSchema>;

