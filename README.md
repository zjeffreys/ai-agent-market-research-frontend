# AI Agent Market Research Blueprint

Turn any company website into an AI‑ready market research brief in minutes. An SEI‑built agent team crawls a site, mines its content, and assembles a go‑to‑market blueprint that accelerates Ops & Strategy decisions.

> **Docs**: [Demo](DEMO.md) · [Agents](AGENTS.md) · [Architecture](ARCHITECTURE.md) · [Security](SECURITY.md)

---

## Why This Matters (SEI Lens)
- **Decision velocity** – surface positioning, offers, and gaps without a 2‑week research sprint.
- **Portfolio prioritization** – compare market signals across targets and fund the winners.
- **Lower research cost** – automate first‑pass discovery and keep consultants on higher‑value analysis.
- **Operational readiness** – blueprint outputs feed change‑management checklists and risk registers.
- **Client impact** – accelerates due diligence and transformation roadmaps with an SEI‑opinionated view.

---

## Demo Flow
1. **Enter a company URL.** Paste a public site and hit **Deploy Agent Team**.
   ![URL entry](docs/images/step1-url.png)
2. **Watch the live agent feed.** URL Scout crawls, Page Selector ranks, Content Miner scrapes, and Strategy Builder synthesizes.
   ![Agent feed](docs/images/step2-feed.png)
3. **Review the AI Market Research Blueprint.** Sections include Overview, Offerings, Segments, Trends, Competition, AI Opportunities, Tech Stack, Risks, Action Plan, and Readiness.
   ![Blueprint output](docs/images/step3-blueprint.png)
4. **Share or download.** Export the blueprint JSON or PDF and drop into client workstreams.

See [DEMO.md](DEMO.md) for a detailed runbook and talking points.

---

## Features
- Four‑stage agent pipeline: discovery → selection → extraction → synthesis.
- Real‑time activity feed with crawl IDs and section progress.
- Structured Blueprint JSON for downstream analytics or presentation.
- Modular agents with clearly defined contracts for easy extension.

---

## Architecture Summary
- **Frontend**: React + TypeScript, Vite build, Tailwind UI.
- **Services**: Scraper & analysis API, Supabase auth/storage, optional OpenAI.
- **Data Layer**: Postgres via Supabase; object storage for assets.
- **Events & Logs**: Agent status events stream to UI and persist in Supabase.
- **Deployment**: Vercel static frontend; edge/serverless functions host APIs.

Diagrams and data contracts live in [ARCHITECTURE.md](ARCHITECTURE.md).

---

## Agents Summary
| Agent | Purpose |
| ----- | ------- |
| URL Scout | Map site structure and seed URLs |
| Page Selector | Prioritize high‑value pages |
| Content Miner | Extract readable text |
| Strategy Builder | Synthesize Blueprint sections |

Full specs: [AGENTS.md](AGENTS.md).

---

## Setup & Local Dev
1. Copy `.env.example` to `.env` and fill keys.
2. Install dependencies: `npm install`.
3. Run dev server: `npm run dev` → http://localhost:5173.
4. Run a build: `npm run build`.
5. Run tests: `npm test`.
6. Lint (may report missing types): `npm run lint`.

---

## Security Summary
- Secrets live in `.env`; service role keys stay server‑side.
- Supabase RLS (row‑level security) restricts access per user/session.
- All requests validate URLs/payload size and honor `public/robots.txt`.
- Logs mask PII and retain for <30 days. See [SECURITY.md](SECURITY.md).

---

## Engineering Audit
**Strengths**
- Typed React/Vite stack with modular agent design.
- Clear separation between frontend, API services, and data layer.

**Gaps**
- No automated unit tests beyond smoke test.
- Lint run reports missing types/unused variables.
- RLS and auth handshake for demo API incomplete.

**Fixes**
- **P0**: Implement full Supabase RLS and secure API auth.
- **P1**: Resolve `npm run lint` errors and add type coverage.
- **P2**: Expand test suite and add CI pipeline.

---

## Roadmap
- Add vertical‑specific scoring heuristics.
- Support PDF and document parsing in Content Miner.
- Add dashboard for cross‑company comparisons.
- One‑click export to SEI strategy templates.

---

## Docs Links
- [Demo Runbook](DEMO.md)
- [Agent Contracts](AGENTS.md)
- [Architecture & Diagrams](ARCHITECTURE.md)
- [Security & Risk Register](SECURITY.md)

---

Built for SEI consultants to rapidly translate web presence into actionable strategy.
