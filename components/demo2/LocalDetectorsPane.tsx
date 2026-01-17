export default function LocalDetectorsPane() {
  return (
    <div className="p-4 border rounded">
      <h2 className="mb-2 font-semibold">Local Detectors</h2>
      <ul className="list-disc pl-5 space-y-1 text-sm">
        <li>Email addresses</li>
        <li>US Social Security numbers</li>
        <li>Credit card numbers (Luhn validated)</li>
      </ul>
    </div>
  );
}
