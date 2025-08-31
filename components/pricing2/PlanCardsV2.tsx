'use client';

import { useState } from 'react';
import pricing from '@/data/pricing_v2.json';

type Plan = {
  name: string;
  price: number;
  features: string[];
};

type Billing = 'monthly' | 'yearly';

export default function PlanCardsV2() {
  const [billing, setBilling] = useState<Billing>('monthly');
  const [activePlan, setActivePlan] = useState<string | null>(null);

  const priceFor = (plan: Plan) => {
    return billing === 'monthly' ? plan.price : plan.price * 12;
  };

  return (
    <div>
      <div className="flex justify-center mb-8 space-x-4">
        <button
          className={`px-4 py-2 border rounded ${billing === 'monthly' ? 'bg-black text-white' : ''}`}
          onClick={() => setBilling('monthly')}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 border rounded ${billing === 'yearly' ? 'bg-black text-white' : ''}`}
          onClick={() => setBilling('yearly')}
        >
          Yearly
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        {pricing.plans.map((plan: Plan) => (
          <div key={plan.name} className="border rounded p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold mb-4">
              ${priceFor(plan)}
              <span className="text-sm font-normal text-gray-500">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
            </p>
            <ul className="flex-1 mb-6 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="text-sm">{f}</li>
              ))}
            </ul>
            <button
              onClick={() => setActivePlan(plan.name)}
              className="mt-auto w-full bg-black text-white py-2 rounded"
            >
              Request Access
            </button>
          </div>
        ))}
      </div>
      {activePlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">Request Access</h3>
            <p className="mb-4 text-sm">
              We will reach out about the {activePlan} plan shortly.
            </p>
            <button
              onClick={() => setActivePlan(null)}
              className="w-full bg-black text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
