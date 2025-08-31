import icp from '@/data/icpCopy.json';

export default function HealthcarePage() {
  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-4">Healthcare</h1>
      <p>{icp.healthcare.cta}</p>
    </section>
  );
}
