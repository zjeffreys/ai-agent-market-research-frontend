import approvals from '@/data/approvals.json';
import RiskBadge from '@/components/RiskBadge';

export default function ApprovalsPage() {
  return (
    <section className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Approvals</h1>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="p-2">Owner</th>
            <th className="p-2">App</th>
            <th className="p-2">Entities</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {approvals.map((a) => (
            <tr key={a.id} className="border-t border-dark-700">
              <td className="p-2">{a.owner}</td>
              <td className="p-2">{a.app}</td>
              <td className="p-2">{a.entities.join(', ')}</td>
              <td className="p-2"><RiskBadge level="medium" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
