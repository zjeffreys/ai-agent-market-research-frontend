# Usage Budgets

The system places explicit limits on how much content a crawl and analysis can consume. These budgets help keep costs predictable and prevent runaway runs.

## Page Budget

- **Purpose:** Caps how many pages the URL Scout and Content Miner will process.
- **Default:** 100 pages.
- **Configure:** set `PAGE_BUDGET` in the environment to override the default.
- **Behavior:** once the limit is reached, additional pages are skipped and later agents operate only on the collected subset.

## Token Budget

- **Purpose:** Limits the number of LLM tokens the Strategy Builder may spend generating the market‑research blueprint.
- **Default:** 100k tokens per run.
- **Configure:** set `TOKEN_BUDGET` in the environment to control spending.
- **Behavior:** when the budget is exhausted, remaining sections are truncated or omitted to avoid exceeding cost thresholds.

Adjust these budgets to balance depth versus cost. Lower numbers give faster, cheaper runs; higher numbers allow broader coverage and richer analysis.
