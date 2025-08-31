'use client';

import { useState } from 'react';
import PlanCardsV2 from '@/components/pricing2/PlanCardsV2';

const faqs = [
  {
    question: 'Can I switch plans later?',
    answer: 'Yes, you can upgrade or downgrade at any time. Billing updates on your next cycle.'
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer: 'Annual billing is simply the monthly price multiplied by 12.'
  },
  {
    question: 'Is there an API trial?',
    answer: 'API access is granted upon request and includes a 30-day trial.'
  }
];

export default function PricingPageV2() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpen(open === idx ? null : idx);
  };

  return (
    <section className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10">Pricing</h1>
      <PlanCardsV2 />
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">FAQ</h2>
        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div key={faq.question} className="border-b">
              <button
                className="w-full text-left flex justify-between items-center py-4"
                onClick={() => toggle(idx)}
              >
                <span className="font-medium">{faq.question}</span>
                <span>{open === idx ? '-' : '+'}</span>
              </button>
              {open === idx && (
                <p className="pb-4 text-sm text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
