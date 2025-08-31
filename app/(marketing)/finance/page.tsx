import icp from '@/data/icpCopy.json';

export default function FinancePage() {
  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-4">Finance</h1>
      <p>{icp.finance.cta}</p>
    </section>
  );
}
