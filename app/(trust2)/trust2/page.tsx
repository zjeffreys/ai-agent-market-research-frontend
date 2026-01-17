import Link from "next/link";

export default function TrustCenterPage() {
  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-4">Trust Center</h1>
      <p className="text-sm mb-4">Transparency on our security, privacy, and compliance practices.</p>
      <ul className="list-disc ml-6 text-sm space-y-2">
        <li><Link href="/trust2/security" className="underline">Security</Link></li>
        <li><Link href="/trust2/privacy" className="underline">Privacy</Link></li>
        <li><Link href="/trust2/compliance" className="underline">Compliance</Link></li>
      </ul>
    </section>
  );
}
