import type { DBAdapter } from '../adapter';
import { LeadSchema, type Lead } from '../../../schemas/lead';
import { TelemetryEventSchema, type TelemetryEvent } from '../../../schemas/telemetry';

export function createMemoryAdapter(): DBAdapter & {
  leads: Lead[];
  events: TelemetryEvent[];
} {
  const leads: Lead[] = [];
  const events: TelemetryEvent[] = [];

  return {
    leads,
    events,
    async insertLead(lead) {
      const parsed = LeadSchema.parse(lead);
      leads.push(parsed);
    },
    async insertTelemetry(event) {
      const parsed = TelemetryEventSchema.parse(event);
      events.push(parsed);
    },
  };
}

