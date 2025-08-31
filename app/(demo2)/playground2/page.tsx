import samples from '@/data/demo2/samples.json';
import BeforeAfter2 from '@/components/demo2/BeforeAfter2';
import LocalDetectorsPane from '@/components/demo2/LocalDetectorsPane';
import '@/styles/demo2.css';

export default function Playground2Page() {
  return (
    <section className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Redaction Playground</h1>
      <LocalDetectorsPane />
      <BeforeAfter2 samples={samples.samples} />
    </section>
  );
}
