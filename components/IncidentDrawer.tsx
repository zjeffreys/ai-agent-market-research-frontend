'use client';
import { useState } from 'react';

export default function IncidentDrawer() {
  const [open, setOpen] = useState(false);
  if (!open)
    return (
      <button onClick={() => setOpen(true)} className="mt-4 underline text-sm">
        Simulate incident
      </button>
    );
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-dark-800 p-4 rounded w-80">
        <h2 className="font-semibold mb-2">Incident details</h2>
        <p className="text-sm">Mock incident content.</p>
        <button className="mt-4 underline text-sm" onClick={() => setOpen(false)}>
          Close
        </button>
      </div>
    </div>
  );
}
