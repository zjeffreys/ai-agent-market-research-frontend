export default function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 border rounded text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-dark-300">{label}</div>
    </div>
  );
}
