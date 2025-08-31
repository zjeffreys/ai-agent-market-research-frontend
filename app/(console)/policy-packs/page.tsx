import { listPolicyPacks } from '@/lib/policy-packs';

export default async function PolicyPacksPage() {
  const packs = await listPolicyPacks();
  return (
    <section className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Policy Packs</h1>
      <ul className="space-y-6">
        {packs.map(({ name, rules }) => {
          const json = JSON.stringify(rules, null, 2);
          return (
            <li key={name} className="border rounded p-4 space-y-2">
              <h2 className="text-xl font-semibold capitalize">{name}</h2>
              <pre className="bg-gray-100 p-2 overflow-x-auto text-sm">{json}</pre>
              <div className="flex gap-4 text-sm">
                <a
                  href={`data:application/json,${encodeURIComponent(json)}`}
                  download={`${name}.json`}
                  className="underline text-blue-600"
                >
                  Export
                </a>
                <a
                  href={`/console-sandbox2?pack=${name}`}
                  className="underline text-blue-600"
                >
                  Try in Sandbox
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
