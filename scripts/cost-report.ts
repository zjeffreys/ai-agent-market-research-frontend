const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('Missing OPENAI_API_KEY');
  process.exit(1);
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

const end = new Date();
const start = new Date();
start.setDate(end.getDate() - 7);

const url = `https://api.openai.com/v1/usage?start_date=${formatDate(start)}&end_date=${formatDate(end)}`;

const res = await fetch(url, {
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

if (!res.ok) {
  console.error('Failed to fetch usage', res.status, res.statusText);
  process.exit(1);
}

const data = await res.json();
const entries = Array.isArray(data.data) ? data.data : [];
const tokens = entries.reduce(
  (sum: number, d: any) =>
    sum + (d.n_context_tokens_total ?? 0) + (d.n_generated_tokens_total ?? 0),
  0,
);

console.log(`Weekly token spend: ${tokens}`);
