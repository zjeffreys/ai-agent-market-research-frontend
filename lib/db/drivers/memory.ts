import type { DBAdapter } from '../adapter';
import { LeadSchema, type Lead } from '../../../schemas/lead';
import { TelemetryEventSchema, type TelemetryEvent } from '../../../schemas/telemetry';
import { TokenUsageSchema, type TokenUsage } from '../../../schemas/tokenUsage';

export function createMemoryAdapter(): DBAdapter & {
  leads: Lead[];
  events: TelemetryEvent[];
  tokenUsage: TokenUsage[];
} {
  const leads: Lead[] = [];
  const events: TelemetryEvent[] = [];
  const tokenUsage: TokenUsage[] = [];

  return {
    leads,
    events,
    tokenUsage,
    async insertLead(lead) {
      const parsed = LeadSchema.parse(lead);
      leads.push(parsed);
    },
    async insertTelemetry(event) {
      const parsed = TelemetryEventSchema.parse(event);
      events.push(parsed);
    },
    async insertTokenUsage(usage) {
      const parsed = TokenUsageSchema.parse(usage);
      tokenUsage.push(parsed);
    },
  };
}

