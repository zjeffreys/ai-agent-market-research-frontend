# Security & Compliance

## Secret Handling
- All secrets stored in `.env`; file is gitignored.
- `SUPABASE_SERVICE_ROLE_KEY` is rotated and kept server‑side only.
- Rotate keys on compromise and never log full secrets.

## RLS / Authorization
- Supabase row‑level security restricts access by user/session.
- Backend endpoints verify ownership of `crawlId`/`analysisId` before returning data.
- Demo API currently uses a lightweight token; full auth handshake is a P0 follow‑up.

## Input Validation & Rate Limiting
- Validate URLs and payload sizes on every request.
- IP‑based rate limiting (e.g., 10 requests/min) protects scraping and LLM endpoints.

## Logging & PII Masking
- Log crawl progress and errors only; mask emails/phones and drop logs after <30 days.
- Use structured logging for easier alerting and audit.

## robots.txt Stance
- Default `public/robots.txt` allows respectful crawling.
- Agents honor `Disallow` rules; edit file to opt out.

## Supply‑Chain Posture
- Dependencies pinned via `package-lock.json`.
- Enable Dependabot/CodeQL for automated vulnerability alerts.

## Risk Register
| Risk | Mitigation |
| ---- | ---------- |
| Leakage of service role key | Keep keys server‑side; rotate on compromise |
| Unbounded crawling | Depth limits and robots.txt enforcement |
| LLM misuse or hallucination | Cite source URLs; allow human review |
| Excessive API cost | Limit pages and token counts per crawl |

---
[← Back to README](README.md)
