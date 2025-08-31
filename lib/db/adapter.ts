import type { Lead } from '../../schemas/lead';
import type { TelemetryEvent } from '../../schemas/telemetry';
import { env } from '../env.server';
import { createSqliteAdapter } from './drivers/sqlite';
import { createMemoryAdapter } from './drivers/memory';

export interface DBAdapter {
  insertLead(lead: Lead): Promise<void>;
  insertTelemetry(event: TelemetryEvent): Promise<void>;
}

export const db: DBAdapter =
  env.DB_DRIVER === 'sqlite'
    ? createSqliteAdapter(env.DATABASE_URL!)
    : createMemoryAdapter();

