import DownloadButtons from '@/components/DownloadButtons';
import FaqAccordion from '@/components/FaqAccordion';

export default function InstallPage() {
  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-4">Install Extension</h1>
      <DownloadButtons />
      <div className="mt-8">
        <FaqAccordion />
      </div>
    </section>
  );
}
