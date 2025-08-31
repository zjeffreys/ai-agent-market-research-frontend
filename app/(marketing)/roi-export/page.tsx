'use client';
import { useState } from 'react';
import assumptions from '@/data/roi2/assumptions.json';
import { calculateRoi } from '@/lib/roi2/calc';

export default function RoiExportPage() {
  const [inputs, setInputs] = useState({
    seats: assumptions.seats,
    promptsPerUserPerDay: assumptions.promptsPerUserPerDay,
    incidentRatePercent: assumptions.incidentRatePercent,
    costPerIncident: assumptions.costPerIncident,
    wagePerHour: assumptions.wagePerHour,
    licenseCostPerSeatPerMonth: assumptions.licenseCostPerSeatPerMonth,
  });

  const onChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [field]: Number(e.target.value) });
  };

  const handleDownload = async () => {
    const assumptionsData = { ...inputs, secondsSavedPerPrompt: assumptions.secondsSavedPerPrompt };
    const outputs = calculateRoi(assumptionsData);
    const res = await fetch('/api/roi2/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assumptions: assumptionsData, outputs }),
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SGAI_ROI_Report.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <section className="p-8 space-y-4 text-sm">
      <h1 className="text-3xl font-bold mb-4">ROI PDF Export</h1>
      <div className="space-y-2">
        <label>
          Seats:
          <input type="number" value={inputs.seats} onChange={onChange('seats')} className="ml-2 text-black" />
        </label>
        <label className="block">
          Prompts/user/day:
          <input type="number" value={inputs.promptsPerUserPerDay} onChange={onChange('promptsPerUserPerDay')} className="ml-2 text-black" />
        </label>
        <label className="block">
          Incident rate %:
          <input type="number" value={inputs.incidentRatePercent} onChange={onChange('incidentRatePercent')} className="ml-2 text-black" />
        </label>
        <label className="block">
          Cost/incident ($):
          <input type="number" value={inputs.costPerIncident} onChange={onChange('costPerIncident')} className="ml-2 text-black" />
        </label>
        <label className="block">
          Wage/hr ($):
          <input type="number" value={inputs.wagePerHour} onChange={onChange('wagePerHour')} className="ml-2 text-black" />
        </label>
        <label className="block">
          License price/mo ($):
          <input type="number" value={inputs.licenseCostPerSeatPerMonth} onChange={onChange('licenseCostPerSeatPerMonth')} className="ml-2 text-black" />
        </label>
      </div>
      <button onClick={handleDownload} className="px-4 py-2 bg-blue-600 text-white rounded">
        Download PDF
      </button>
    </section>
  );
}
