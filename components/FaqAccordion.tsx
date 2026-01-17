'use client';
import { useState } from 'react';

const faqs = [
  { q: 'How is data handled?', a: 'Demo processes locally; no data stored.' },
  { q: 'Is there a free tier?', a: 'Yes, up to 5 users.' }
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {faqs.map((f, i) => (
        <div key={i} className="border-b border-dark-700 py-2">
          <button className="w-full text-left" onClick={() => setOpen(open === i ? null : i)}>
            {f.q}
          </button>
          {open === i && <p className="mt-2 text-sm text-dark-300">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}
