# Agents

Four modular agents power the market‑research pipeline. Each exposes a clear contract for reuse and extension.

## URL Scout
**Purpose**: Discover the site's structure and seed URLs for analysis.

**Inputs**
```json
{
  "baseUrl": "string",
  "maxDepth": "number"
}
```
**Outputs**
```json
{
  "crawlId": "string",
  "discoveredUrls": ["string"],
  "total": "number"
}
```
**Heuristics**: Breadth‑first crawl capped by `maxDepth`; deduplicates URLs and skips media/assets.

**SLAs**: Target <30s for 100 pages.

**Failure Modes**: Network errors or robots.txt blocks → retry with exponential backoff up to 3 times.

**Observability**: Emits `crawlId`, URL counts, and timing metrics to the log stream.

**SOP Checklist**
1. Validate `baseUrl`.
2. Fetch robots.txt and honor disallow rules.
3. Crawl up to `maxDepth`.
4. Emit `crawlId` and URL list.
5. Record post‑run self‑improvement note.

**Extension Points**: Plug in vertical‑specific URL filters (e.g., `/docs` for SaaS).

---

## Page Selector
**Purpose**: Prioritize URLs for scraping based on relevance.

**Inputs**
```json
{
  "crawlId": "string",
  "discoveredUrls": ["string"],
  "keywords": ["string"]
}
```
**Outputs**
```json
{
  "crawlId": "string",
  "selectedUrls": ["string"],
  "rejectedUrls": ["string"]
}
```
**Heuristics**: Scores URLs using keyword frequency and path heuristics (e.g., `/about`, `/pricing`).

**SLAs**: Target <5s for 100 URLs.

**Failure Modes**: Empty result set or scoring failure → fallback to top‑level pages.

**Observability**: Logs selected vs. rejected counts and top keywords.

**SOP Checklist**
1. Load URLs via `crawlId`.
2. Score and sort by relevance.
3. Return top N as `selectedUrls`.
4. Note rationale in log.
5. Record post‑run self‑improvement note.

**Extension Points**: Swap scoring function or add ML‑based ranking.

---

## Content Miner
**Purpose**: Extract readable text from selected pages.

**Inputs**
```json
{
  "crawlId": "string",
  "selectedUrls": ["string"]
}
```
**Outputs**
```json
{
  "crawlId": "string",
  "scraped": [
    {"url": "string", "title": "string", "content": "string"}
  ]
}
```
**Heuristics**: Uses headless browser or HTML parsing; strips scripts/styles and deduplicates sections.

**SLAs**: Target <60s for 50 pages.

**Failure Modes**: Timeout or parsing error → retry once with headless browser fallback.

**Observability**: Emits per‑page status and byte counts.

**SOP Checklist**
1. Fetch each URL and parse HTML.
2. Normalize text and store with metadata.
3. Stream progress to log.
4. Aggregate all content.
5. Record post‑run self‑improvement note.

**Extension Points**: Add language detection, PDF or document parsers.

---

## Strategy Builder
**Purpose**: Transform mined content into the AI Market Research Blueprint.

**Inputs**
```json
{
  "crawlId": "string",
  "scraped": [
    {"url": "string", "title": "string", "content": "string"}
  ]
}
```
**Outputs**
```json
{
  "analysisId": "string",
  "blueprint": {
    "companyOverview": "string",
    "keyOfferings": ["string"],
    "targetSegments": ["string"],
    "marketTrends": ["string"],
    "competitiveLandscape": ["string"],
    "opportunitiesForAI": ["string"],
    "techStack": ["string"],
    "dataRisks": ["string"],
    "actionPlan": ["string"],
    "teamAIReadiness": "string"
  }
}
```
**Heuristics**: Embedding‑assisted clustering and templated LLM prompts per section.

**SLAs**: Target <2 min end‑to‑end.

**Failure Modes**: LLM error or token limit → chunk content and retry up to 2 times.

**Observability**: Logs token usage and section completion events.

**SOP Checklist**
1. Chunk scraped content and generate section drafts.
2. Assemble final Blueprint JSON.
3. Persist `analysisId` and output.
4. Surface summary to UI.
5. Record post‑run self‑improvement note.

**Extension Points**: Swap LLM provider or append industry‑specific sections.

---

[← Back to README](README.md)
