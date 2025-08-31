# Demo Runbook

Audience: SEI Phoenix Managing Director

## Step‑by‑Step
1. **Kickoff** – one‑liner: "This agent team scans a company's site and builds an AI‑ready market research blueprint in minutes."
2. **Enter URL** – paste a real company homepage and click **Deploy Agent Team**.
3. **Narrate the live feed** – point out crawl IDs, page counts, and agent handoffs.
4. **Show the Blueprint** – walk through each section and tie to Ops & Strategy decisions (prioritization, resourcing, risk management).
5. **Discuss ROI** – ~90% faster first‑pass research; <$1 per 10‑page site.
6. **Close** – outline next steps: pilot scope, KPIs, timeline.

## Talking Points
- **Decision velocity** – cuts days of manual discovery.
- **Ops & Strategy tie‑in** – outputs drop into existing SEI playbooks.
- **ROI** – automated crawl + analysis keeps consultants on high‑value work.
- **Fallback plan** – if APIs misbehave, load cached `example-output.json` and walk through.

## Fallback Plan
- If network/API is slow, load cached output from `example-output.json`.
- Screenshare the Blueprint JSON or PDF and narrate key insights.

## Q&A
- **Accuracy?** Agents surface raw text; consultants verify and refine.
- **Hallucination defense?** Blueprint cites source URLs; no generation without data.
- **Scale?** Horizontal scaling of crawl workers; LLM cost scales linearly.
- **Change mgmt?** Outputs feed existing SEI playbooks and communication plans.

---
[← Back to README](README.md)
