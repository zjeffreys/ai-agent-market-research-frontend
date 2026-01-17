# Leads Webhook Relay

The `/api/lead-webhook` route forwards lead submissions to an external
URL or stores them locally when no endpoint is configured.

## Google Sheets via Apps Script
1. Create a new Google Apps Script project.
2. Add a `doPost(e)` function that appends `e.postData.contents` to a
   Google Sheet.
3. Deploy as a web app that allows **Anyone** to access and copy the
   generated URL.

## Zapier
1. Create a new Zap using the **Webhook → Catch Hook** trigger.
2. Copy the provided webhook URL.

## Environment Variable
Set the webhook URL in `LEAD_WEBHOOK_URL` (e.g. in `.env` or your
hosting provider's dashboard). When defined, incoming leads are `POST`
ed to this URL as JSON.

## Fallback Storage
If `LEAD_WEBHOOK_URL` is undefined or the webhook request fails,
submissions are appended to `.data/leads/pending.ndjson`.

Use `scripts/replay-leads.ts` to resend any pending entries once the
webhook is available.
