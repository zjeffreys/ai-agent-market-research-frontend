import RuleDesigner from '@/components/policy2/RuleDesigner';
import PolicyPreview from '@/components/policy2/PolicyPreview';

export default function ConsoleSandbox2Page() {
  return (
    <section className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Policy Sandbox 2</h1>
      <RuleDesigner />
      <PolicyPreview />
    </section>
  );
}
