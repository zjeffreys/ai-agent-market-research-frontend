'use client';

import { useEffect, useState } from 'react';
import { Rule, evaluate, loadRules } from '@/lib/policy2';
import samples from '@/data/policy2/samples.json';

export default function PolicyPreview() {
  const [text, setText] = useState(samples.sample);
  const [rules, setRules] = useState<Rule[]>([]);
  const [result, setResult] = useState(() => evaluate(samples.sample, []));
  const [showMask, setShowMask] = useState(false);

  useEffect(() => {
    const update = () => setRules(loadRules());
    update();
    window.addEventListener('policy2:rules', update);
    return () => window.removeEventListener('policy2:rules', update);
  }, []);

  useEffect(() => {
    setResult(evaluate(text, rules));
  }, [text, rules]);

  return (
    <div className="p-4 border rounded space-y-4 text-sm">
      <textarea
        className="w-full border p-2 h-40"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="px-2 py-1 border rounded text-xs"
        onClick={() => setShowMask((v) => !v)}
      >
        {showMask ? 'Show Raw' : 'Mask Preview'}
      </button>
      <pre className="bg-gray-50 p-2 rounded overflow-auto">{showMask ? result.masked : text}</pre>
      <div>
        <h3 className="font-semibold mb-1">Violations</h3>
        {result.violations.length === 0 && (
          <div className="text-gray-500">None</div>
        )}
        <ul className="space-y-1">
          {result.violations.map((v) => (
            <li key={v.rule.id} className="text-xs">
              {v.rule.matcher} ({v.rule.action}): {v.matches.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
