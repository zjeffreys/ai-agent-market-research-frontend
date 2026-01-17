export interface TelemetryEvent {
  event: string;
  props?: Record<string, any>;
  ts: number;
}

const STORAGE_KEY = 'telemetry_buffer';
const recent: TelemetryEvent[] = [];

function readBuffer(): TelemetryEvent[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeBuffer(events: TelemetryEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

async function send(ev: TelemetryEvent) {
  await fetch('/api/telemetry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ev),
  });
}

export async function flush() {
  if (typeof localStorage === 'undefined') return;
  const buffer = readBuffer();
  const remaining: TelemetryEvent[] = [];
  for (const ev of buffer) {
    try {
      await send(ev);
    } catch {
      remaining.push(ev);
    }
  }
  writeBuffer(remaining);
}

export async function track(event: string, props: Record<string, any> = {}) {
  if (typeof localStorage === 'undefined') return;
  const ev: TelemetryEvent = { event, props, ts: Date.now() };
  recent.push(ev);
  try {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      throw new Error('offline');
    }
    await send(ev);
    await flush();
  } catch {
    const buffer = readBuffer();
    buffer.push(ev);
    writeBuffer(buffer);
  }
}

export function getRecentEvents(): TelemetryEvent[] {
  if (typeof localStorage === 'undefined') {
    return recent.slice(-20);
  }
  return [...readBuffer(), ...recent].slice(-20);
}
