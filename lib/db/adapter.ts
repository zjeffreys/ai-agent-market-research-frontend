import type { Lead } from '../../schemas/lead';
import type { TelemetryEvent } from '../../schemas/telemetry';
import type { TokenUsage } from '../../schemas/tokenUsage';
import { env } from '../env';
import { createSqliteAdapter } from './drivers/sqlite';
import { createMemoryAdapter } from './drivers/memory';

export interface DBAdapter {
  insertLead(lead: Lead): Promise<void>;
  insertTelemetry(event: TelemetryEvent): Promise<void>;
  insertTokenUsage(usage: TokenUsage): Promise<void>;
}

export const db: DBAdapter =
  env.DB_DRIVER === 'sqlite'
    ? createSqliteAdapter(env.DATABASE_URL!)
    : createMemoryAdapter();

