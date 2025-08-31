import controls from "@/data/trust2/controls.json";

export default function CompliancePage() {
  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-4">Compliance</h1>
      <ul className="list-disc ml-6 text-sm space-y-2">
        {controls.map((control) => (
          <li key={control.id}>
            {control.id}: {control.description}
          </li>
        ))}
        <li>24h detection / 72h response incident policy</li>
      </ul>
    </section>
  );
}
