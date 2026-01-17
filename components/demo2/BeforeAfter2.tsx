'use client';
import { useState } from 'react';
import InlineCoachBadge from './InlineCoachBadge';

type Match = {
  type: string;
  match: string;
  severity: 'high' | 'medium' | 'low';
  suggestion: string;
};

export default function BeforeAfter2({ samples }: { samples: string[] }) {
  const [input, setInput] = useState(samples[0] || '');
  const [redacted, setRedacted] = useState('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleScan() {
    setLoading(true);
    const res = await fetch('/api/demo2/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    });
    const data = await res.json();
    setRedacted(data.redacted);
    setMatches(data.matches);
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mr-2 text-sm">Sample:</label>
        <select
          className="border p-1 text-sm"
          onChange={(e) => setInput(e.target.value)}
        >
          {samples.map((s, i) => (
            <option key={i} value={s}>
              Sample {i + 1}
            </option>
          ))}
        </select>
      </div>
      <textarea
        className="w-full border p-2 h-40"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded"
        onClick={handleScan}
        disabled={loading}
      >
        {loading ? 'Scanning...' : 'Scan'}
      </button>
      {redacted && (
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Redacted</h3>
          <p className="whitespace-pre-wrap">{redacted}</p>
          <InlineCoachBadge matches={matches} />
        </div>
      )}
    </div>
  );
}
