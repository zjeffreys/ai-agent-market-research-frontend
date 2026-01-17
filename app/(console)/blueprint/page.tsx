'use client';
import { useBlueprint } from '@/store/useBlueprint';

export default function BlueprintPage() {
  const { approved, toggleApproval } = useBlueprint();

  return (
    <section className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Blueprint Approval</h1>
      <div className="flex items-center gap-4">
        <span className="font-medium">Status: {approved ? 'Approved' : 'Pending'}</span>
        <button
          onClick={toggleApproval}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded"
        >
          {approved ? 'Revoke' : 'Approve'}
        </button>
      </div>
    </section>
  );
}
