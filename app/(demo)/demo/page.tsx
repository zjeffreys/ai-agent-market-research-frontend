import sample from '@/data/demoSamples.json';
import BeforeAfterPane from '@/components/BeforeAfterPane';
import FileDropZone from '@/components/FileDropZone';
import IncidentDrawer from '@/components/IncidentDrawer';

export default function DemoPage() {
  return (
    <section className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Live Redaction Demo</h1>
      <BeforeAfterPane sample={sample.sample} />
      <FileDropZone />
      <IncidentDrawer />
    </section>
  );
}
