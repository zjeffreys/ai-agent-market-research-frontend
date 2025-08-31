'use client';
import { useState } from 'react';
import RedactionHighlighter from './RedactionHighlighter';
import { detectEntities, applyRedaction } from '@/lib/redaction';

export default function BeforeAfterPane({ sample }: { sample: string }) {
  const [strategy, setStrategy] = useState<'mask' | 'token'>('mask');
  const entities = detectEntities(sample).entities;
  const sanitized = applyRedaction(sample, entities, strategy).sanitized;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="p-4 border rounded">
        <h3 className="mb-2 font-semibold">Original</h3>
        <RedactionHighlighter text={sample} />
      </div>
      <div className="p-4 border rounded">
        <h3 className="mb-2 font-semibold">Sanitized ({strategy})</h3>
        <p>{sanitized}</p>
        <button
          className="mt-2 text-xs underline"
          onClick={() => setStrategy(strategy === 'mask' ? 'token' : 'mask')}
        >
          Toggle strategy
        </button>
      </div>
    </div>
  );
}
