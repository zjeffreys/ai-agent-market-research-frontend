import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import type { DBAdapter } from '../adapter';
import { LeadSchema } from '../../../schemas/lead';
import { TelemetryEventSchema } from '../../../schemas/telemetry';
import { TokenUsageSchema } from '../../../schemas/tokenUsage';

export function createSqliteAdapter(url: string): DBAdapter {
  const file = url.replace('file:', '');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const db = new Database(file);

  db.prepare(
    'CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, company TEXT, size TEXT, vertical TEXT, approved INTEGER DEFAULT 0)'
  ).run();
  db.prepare(
    'CREATE TABLE IF NOT EXISTS telemetry (id INTEGER PRIMARY KEY AUTOINCREMENT, event TEXT, props TEXT, ts INTEGER)'
  ).run();
  db.prepare(
    'CREATE TABLE IF NOT EXISTS token_usage (id INTEGER PRIMARY KEY AUTOINCREMENT, analysisId TEXT, tokens INTEGER, ts INTEGER)'
  ).run();

  return {
    async insertLead(lead) {
      const parsed = LeadSchema.parse(lead);
      db.prepare(
        'INSERT INTO leads (email, company, size, vertical, approved) VALUES (?, ?, ?, ?, ?)'
      ).run(
        parsed.email,
        parsed.company,
        parsed.size,
        parsed.vertical,
        parsed.approved ? 1 : 0
      );
    },
    async insertTelemetry(event) {
      const parsed = TelemetryEventSchema.parse(event);
      db.prepare(
        'INSERT INTO telemetry (event, props, ts) VALUES (?, ?, ?)'
      ).run(parsed.event, JSON.stringify(parsed.props ?? {}), parsed.ts);
    },
    async insertTokenUsage(usage) {
      const parsed = TokenUsageSchema.parse(usage);
      db.prepare(
        'INSERT INTO token_usage (analysisId, tokens, ts) VALUES (?, ?, ?)'
      ).run(parsed.analysisId, parsed.tokens, parsed.ts);
    },
  };
}

