# Privacy Controls

This project prevents raw personally identifiable information (PII) from being stored.

## Masking

`lib/privacy/mask.ts` deterministically hashes emails, phone numbers, Social Security numbers, and names with a salt while preserving the last two characters. The `/api/telemetry` endpoint applies this masking before writing events and marks records with `"masked": true`.

## Retention

`scripts/retention.ts` removes telemetry events older than `TELEMETRY_RETENTION_DAYS` (30 days by default). Run `npm run retention` to execute the cleanup locally.

## Audit Trails

`lib/audit/logger.ts` writes append‑only JSON lines to `.logs/audit-YYYY-MM-DD.jsonl`. Each create or delete operation includes a request id and timestamp for later inspection.
