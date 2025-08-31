import { z } from 'zod';

export const TelemetryEventSchema = z.object({
  event: z.string().min(1),
  props: z.record(z.any()).optional(),
  ts: z.number().int(),
});

export type TelemetryEvent = z.infer<typeof TelemetryEventSchema>;

