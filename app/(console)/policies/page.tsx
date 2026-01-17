import PolicyRuleBuilder from '@/components/PolicyRuleBuilder';

export default function PoliciesPage() {
  return (
    <section className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Policies</h1>
      <PolicyRuleBuilder />
    </section>
  );
}
