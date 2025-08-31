import RedactionHighlighter from '@/components/RedactionHighlighter';
import sample from '@/data/demoSamples.json';

export default function HomePage() {
  return (
    <section className="p-8">
      <h1 className="text-4xl font-bold mb-4">The seatbelt for enterprise AI.</h1>
      <p className="mb-4">Detect, redact, and audit PII/PHI/PCI before prompts leave your org.</p>
      <RedactionHighlighter text={sample.sample} />
    </section>
  );
}
