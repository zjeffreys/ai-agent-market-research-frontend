'use client';
import { useEffect, useState } from 'react';
import { getRecentEvents, flush, TelemetryEvent } from '@/lib/telemetry/client';

export default function TelemetryDevTap() {
  const [events, setEvents] = useState<TelemetryEvent[]>([]);

  useEffect(() => {
    const update = () => setEvents(getRecentEvents());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-72 max-h-64 overflow-y-auto border bg-white p-2 text-xs shadow">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold">Telemetry</span>
        <button onClick={flush} className="text-blue-600 underline">Flush</button>
      </div>
      <ul className="space-y-1">
        {events.slice(-20).map((e, i) => (
          <li key={i} className="break-all">
            {e.event}: {e.props && Object.keys(e.props).length ? JSON.stringify(e.props) : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
