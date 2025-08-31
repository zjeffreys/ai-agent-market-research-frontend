import KpiCard from '@/components/KpiCard';
import IncidentTable from '@/components/IncidentTable';

export default function DashboardPage() {
  return (
    <section className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard label="Incidents" value="3" />
        <KpiCard label="Blocked %" value="50%" />
        <KpiCard label="Masked %" value="50%" />
      </div>
      <IncidentTable />
    </section>
  );
}
