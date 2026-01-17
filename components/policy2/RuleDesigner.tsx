'use client';

import { useEffect, useState } from 'react';
import { Rule, loadRules, saveRules } from '@/lib/policy2';

const EMPTY: Rule = {
  id: '',
  scope: { org: '', domain: '', urlPattern: '' },
  matcher: 'email',
  customRegex: '',
  action: 'mask',
  severity: 'low',
  explain: '',
};

export default function RuleDesigner() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [editing, setEditing] = useState<Rule | null>(null);

  useEffect(() => {
    setRules(loadRules());
  }, []);

  useEffect(() => {
    saveRules(rules);
  }, [rules]);

  const startEdit = (rule?: Rule) => {
    if (rule) setEditing({ ...rule });
    else setEditing({ ...EMPTY, id: Date.now().toString() });
  };

  const submit = () => {
    if (!editing) return;
    setRules((prev) => {
      const exists = prev.some((r) => r.id === editing.id);
      return exists ? prev.map((r) => (r.id === editing.id ? editing : r)) : [...prev, editing];
    });
    setEditing(null);
  };

  const remove = (id: string) => setRules((prev) => prev.filter((r) => r.id !== id));

  return (
    <div className="p-4 border rounded space-y-4 text-sm">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Rules</h2>
        <button className="px-2 py-1 border rounded text-xs" onClick={() => startEdit()}>Add</button>
      </div>
      {rules.length === 0 && <div className="text-gray-500">No rules defined.</div>}
      <ul className="space-y-2">
        {rules.map((r) => (
          <li key={r.id} className="flex justify-between items-center border p-2 rounded">
            <div>
              <div className="font-medium">{r.matcher} → {r.action}</div>
              <div className="text-xs text-gray-500">{r.explain}</div>
            </div>
            <div className="space-x-2 text-xs">
              <button className="px-2 py-1 border rounded" onClick={() => startEdit(r)}>Edit</button>
              <button className="px-2 py-1 border rounded" onClick={() => remove(r.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editing && (
        <div className="border-t pt-4 space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <input
              className="border p-1"
              placeholder="Org"
              value={editing.scope.org}
              onChange={(e) => setEditing({ ...editing, scope: { ...editing.scope, org: e.target.value } })}
            />
            <input
              className="border p-1"
              placeholder="Domain"
              value={editing.scope.domain}
              onChange={(e) => setEditing({ ...editing, scope: { ...editing.scope, domain: e.target.value } })}
            />
            <input
              className="border p-1"
              placeholder="URL Pattern"
              value={editing.scope.urlPattern}
              onChange={(e) => setEditing({ ...editing, scope: { ...editing.scope, urlPattern: e.target.value } })}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <select
              className="border p-1"
              value={editing.matcher}
              onChange={(e) => setEditing({ ...editing, matcher: e.target.value as any })}
            >
              <option value="email">email</option>
              <option value="ssn">ssn</option>
              <option value="cc">cc</option>
              <option value="custom">custom</option>
            </select>
            {editing.matcher === 'custom' && (
              <input
                className="border p-1"
                placeholder="Custom Regex"
                value={editing.customRegex}
                onChange={(e) => setEditing({ ...editing, customRegex: e.target.value })}
              />
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <select
              className="border p-1"
              value={editing.action}
              onChange={(e) => setEditing({ ...editing, action: e.target.value as any })}
            >
              <option value="block">block</option>
              <option value="mask">mask</option>
              <option value="allow">allow</option>
            </select>
            <select
              className="border p-1"
              value={editing.severity}
              onChange={(e) => setEditing({ ...editing, severity: e.target.value as any })}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
            <input
              className="border p-1 col-span-3 sm:col-span-1"
              placeholder="Explain"
              value={editing.explain}
              onChange={(e) => setEditing({ ...editing, explain: e.target.value })}
            />
          </div>
          <div className="space-x-2">
            <button className="px-2 py-1 border rounded text-xs" onClick={submit}>Save</button>
            <button className="px-2 py-1 border rounded text-xs" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
