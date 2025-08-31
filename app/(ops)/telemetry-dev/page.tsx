import TelemetryDevTap from '@/components/TelemetryDevTap';

export default function TelemetryDevPage() {
  return (
    <div className="p-4 space-y-4">
      <TelemetryDevTap />
      <h1 className="text-xl font-bold">Telemetry Dev</h1>
      <p>
        Use the <code>track</code> helper to capture analytics events in your pages.
      </p>
      <pre className="rounded bg-gray-100 p-2 text-xs">{`import { track } from '@/lib/telemetry/client';\n\ntrack('view', { page: 'home' });`}</pre>
    </div>
  );
}
