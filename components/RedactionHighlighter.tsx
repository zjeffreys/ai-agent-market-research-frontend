'use client';
import { useEffect, useState } from 'react';
import { detectEntities, Entity } from '@/lib/redaction';

export default function RedactionHighlighter({ text }: { text: string }) {
  const [entities, setEntities] = useState<Entity[]>([]);
  useEffect(() => {
    setEntities(detectEntities(text).entities);
  }, [text]);

  let cursor = 0;
  const chunks: React.ReactNode[] = [];
  entities.forEach((e, idx) => {
    chunks.push(<span key={`t-${idx}`}>{text.slice(cursor, e.start)}</span>);
    chunks.push(
      <span
        key={`e-${idx}`}
        className="bg-red-800/40 text-red-200 rounded px-0.5"
        title={`Flagged as ${e.type}`}
      >
        {text.slice(e.start, e.end)}
      </span>
    );
    cursor = e.end;
  });
  chunks.push(<span key="end">{text.slice(cursor)}</span>);

  return <>{chunks}</>;
}
