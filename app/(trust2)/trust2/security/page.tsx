export default function SecurityPage() {
  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-4">Security</h1>
      <ul className="list-disc ml-6 text-sm space-y-2">
        <li>Local-first threat detection</li>
        <li>All data hashed at rest and in transit</li>
        <li>24h detection / 72h response incident policy</li>
      </ul>
    </section>
  );
}
