import incidents from '@/data/incidents.json';

export default function IncidentTable() {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left">
          <th className="p-2">App</th>
          <th className="p-2">Entity</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {incidents.slice(0,5).map((i) => (
          <tr key={i.id} className="border-t border-dark-700">
            <td className="p-2">{i.app}</td>
            <td className="p-2">{i.entity}</td>
            <td className="p-2">{i.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
