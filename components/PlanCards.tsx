import pricing from '@/data/pricing.json';

export default function PlanCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {pricing.plans.map((p: any) => (
        <div key={p.name} className="border rounded p-4">
          <h3 className="font-semibold">{p.name}</h3>
          <p className="text-sm">{p.price}</p>
        </div>
      ))}
    </div>
  );
}
