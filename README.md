# SGAI — SafeguardAI
_The seatbelt for enterprise AI adoption._

SafeguardAI (SGAI) is a **Grammarly-style compliance layer** that detects and redacts **PII, PHI, and PCI data** in real time before prompts leave the organization, enabling safe AI adoption under **HIPAA, PCI, GDPR, and CCPA**.

---

## 🚀 Features
- **Browser Extension (MV3)**: Works across ChatGPT, Claude, Copilot, Gmail, Slack, Salesforce, etc., with inline highlights and suggestions.
- **Interactive Demo**: Redacts SSNs, credit cards, emails, and DOBs in real time with hover explanations.
- **Compliance Dashboard**:
  - 📊 KPIs (incidents, blocked %, masked %, top entities)
  - 🔎 Incident drill-down with raw vs. sanitized payloads
  - ⚖️ Policy builder (visual IF/THEN rules)
  - ✅ Approval workflows and audit logs
- **Sector-Specific Messaging**: Tailored pages for Healthcare, Finance, and Enterprise.
- **Pricing & ROI Calculator**: Per-seat SaaS ($15–30/user), enterprise flat fee ($50k–250k/yr), and API usage ($0.01–0.05/doc) with breach cost estimates.

---

## 🏗 Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui + Framer Motion
- Zustand state, React Hook Form + Zod validation
- Lucide Icons
- Vitest unit tests, Playwright E2E tests
- Chrome Extension MV3 with shared React components

---

## 📂 Project Structure
```
/app
/(marketing)/[icp]
/(marketing)/install
/(marketing)/pricing
/(marketing)/roi
/(demo)/demo
/(console)/{dashboard,policies,approvals,settings}
/components
/data
/lib
/store
/extension
/tests
```

---

## 🧪 Local Development
```bash
# Install deps
npm install

# Start dev server
npm run dev

# Run unit tests
npm test

# Run E2E tests
npx playwright test

# Build production app
npm run build

# Build Chrome extension (outputs to /extension/dist)
npm run build:ext
```
Load the extension in Chrome by enabling Developer Mode at `chrome://extensions` and selecting `extension/dist`.

### Mock Data & APIs
- `/data/*.json` seeds incidents, policies, pricing, and ROI assumptions.
- Mock API routes under `/api/mock/*`.
- Demo redaction runs locally in-browser; no data leaves the device.

---

## 💾 Persistence
The app uses a lightweight database adapter with two drivers:

- **SQLite** (default): stores data in `.data/sgai.sqlite` with no external services.
- **In-memory**: volatile fallback useful for tests or ephemeral environments.

Switch drivers by setting `DB_DRIVER` in your environment. For SQLite, also set `DATABASE_URL`:

```bash
# .env
DB_DRIVER=sqlite
DATABASE_URL="file:.data/sgai.sqlite"
```

Set `DB_DRIVER=memory` to disable persistence.

---

## 📊 Market Positioning
SGAI addresses the "Shadow AI" risk where employees unknowingly leak sensitive data into LLMs.

- 63% of ChatGPT inputs contain PII.
- Companies like Samsung, Amazon, and Apple have banned AI tools over data leaks.
- Regulators (HIPAA, PCI, GDPR) impose multi-million-dollar fines.

**Differentiators**
- Employee-friendly UX (Grammarly-like highlights)
- Bottom-up freemium adoption
- Enterprise compliance depth (audit logs, SSO/SCIM, on-prem options)

---

## 🗺 Further Reading
- [Market Research & Feasibility Study](MARKET_RESEARCH.md)
- [Pitch Deck Outline](PITCH_DECK.md)

---

## 👥 Team
- Zach — CTO (AI/ML, full-stack engineering)
- Mark — CPO (UX/product design)
- Chris — COO (operations & compliance)
- Bobby — CRO/BD (GTM & partnerships)

---

## 📜 License
MIT (subject to change as enterprise features mature)

## 🤝 Contributing
We welcome PRs for new detectors, UI/UX polish, and tests.

## 📬 Contact
Website: safeguardai.dev (placeholder)

Email: founders@safeguardai.dev
