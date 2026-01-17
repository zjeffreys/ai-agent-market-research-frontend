import icp from '@/data/icpCopy.json';

export default function EnterprisePage() {
  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-4">Enterprise</h1>
      <p>{icp.enterprise.cta}</p>
    </section>
  );
}
