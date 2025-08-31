'use client';
import { useState } from 'react';

type Match = {
  type: string;
  match: string;
  severity: 'high' | 'medium' | 'low';
  suggestion: string;
};

export default function InlineCoachBadge({ matches }: { matches: Match[] }) {
  const [open, setOpen] = useState(false);
  const counts = matches.reduce<Record<string, number>>((acc, m) => {
    acc[m.severity] = (acc[m.severity] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mt-2">
      <button
        className="flex items-center gap-2 text-sm underline"
        onClick={() => setOpen(true)}
      >
        <span>Issues:</span>
        {['high', 'medium', 'low'].map((s) =>
          counts[s] ? (
            <span key={s} className={`badge-${s}`}>{counts[s]}</span>
          ) : null,
        )}
      </button>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white p-4 rounded shadow max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-2">Detected Issues</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {matches.map((m, i) => (
                <li key={i} className="text-sm">
                  <strong>{m.type}:</strong> {m.match} – {m.suggestion}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
