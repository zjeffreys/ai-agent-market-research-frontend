# Architecture

## Overview
- **Frontend**: React + TypeScript powered by Vite and styled with Tailwind.
- **Backend Services**: Serverless scraping & analysis API, Supabase (auth + Postgres), optional OpenAI.
- **Data Layer**: Postgres tables for crawls/pages/analyses and object storage for assets.
- **Event Pipeline**: Agents emit status events that stream to the UI and persist in a `logs` table.

## Component Diagram
```
[Browser]
   |
   v
[Vite/React/TS UI] --> [/api/* via Vercel Edge]
      |                         \
      |                          --> [Scraper & Analysis API]
      |                                   |
      v                                   v
[Supabase Auth & DB] <------ logs ------ [OpenAI API]
```

## Sequence Diagram
```
User -> UI: enter URL
UI -> Scraper API: /discover {url}
Scraper API -> Supabase: store crawl record
Scraper API -> UI: crawlId
UI -> Scraper API: /select {crawlId}
Scraper API -> UI: candidate URLs
User -> UI: confirm URLs
UI -> Scraper API: /scrape {urls}
Scraper API -> Supabase: persist pages
Scraper API -> OpenAI: synthesize blueprint
Scraper API -> UI: analysisId + status
UI -> Supabase: fetch blueprint
UI -> User: render Blueprint
```

## Data Model
- **tables**
  - `crawls` (id, base_url, created_at)
  - `pages` (id, crawl_id, url, content)
  - `analyses` (id, crawl_id, report_json)
- **indexes**: `pages.crawl_id`, `analyses.crawl_id`
- **RLS**: enforce by user/session (TODO)

## Env / Config Map
| Key | Used By |
| --- | --- |
| `PUBLIC_SITE_URL` | build/deploy references |
| `VITE_SCRAPER_API_BASE_URL` | frontend hooks `useAnalysis` |
| `VITE_SUPABASE_URL` | `src/lib/supabase.ts` |
| `VITE_SUPABASE_ANON_KEY` | `src/lib/supabase.ts` |
| `OPENAI_API_KEY` | server-side analysis service |
| `SUPABASE_SERVICE_ROLE_KEY` | secure server-side tasks |

## Deployment Topology
- **Local**: `npm run dev` launches Vite server at `localhost:5173` with mock or local API.
- **Production**: Vercel builds static assets; edge/serverless functions host the scraping & analysis API.
- **Logging**: Supabase `logs` table or Vercel console captures agent events.

## Scalability Notes
- Crawl ~1 MB per 100 pages; LLM cost ~USD $0.05 per 1k tokens.
- Horizontal scaling of crawl workers and rate limiting guard spend.

## Replaceables
- Supabase ↔ Firebase/PlanetScale
- OpenAI ↔ Anthropic / local LLM
- Vercel ↔ Netlify / Render

---
[← Back to README](README.md)
