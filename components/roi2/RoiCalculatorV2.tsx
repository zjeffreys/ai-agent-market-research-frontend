'use client';
import { useState } from 'react';
import assumptions from '@/data/roi2/assumptions.json';

export default function RoiCalculatorV2() {
  const [seats, setSeats] = useState(assumptions.seats);
  const [promptsPerUser, setPromptsPerUser] = useState(assumptions.promptsPerUserPerDay);
  const [incidentRate, setIncidentRate] = useState(assumptions.incidentRatePercent);
  const [costPerIncident, setCostPerIncident] = useState(assumptions.costPerIncident);
  const [wage, setWage] = useState(assumptions.wagePerHour);
  const [secondsSaved, setSecondsSaved] = useState(assumptions.secondsSavedPerPrompt);

  const totalPromptsPerDay = seats * promptsPerUser;
  const incidentsPerYear = totalPromptsPerDay * 365 * (incidentRate / 100);
  const avoidedExposure = incidentsPerYear * costPerIncident;

  const hoursSavedPerYear = totalPromptsPerDay * 365 * (secondsSaved / 3600);
  const timeSavings = hoursSavedPerYear * wage;

  const annualBenefits = avoidedExposure + timeSavings;
  const annualCost = seats * assumptions.licenseCostPerSeatPerMonth * 12;
  const roi = annualCost > 0 ? ((annualBenefits - annualCost) / annualCost) * 100 : 0;
  const paybackMonths = annualBenefits > 0 ? (annualCost * 12) / annualBenefits : 0;

  return (
    <div className="border rounded p-4 text-sm space-y-4">
      <div>
        <label className="mr-2">Seats:</label>
        <input
          type="number"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="text-black"
        />
      </div>
      <div>
        <label className="mr-2">Prompts/user/day:</label>
        <input
          type="number"
          value={promptsPerUser}
          onChange={(e) => setPromptsPerUser(Number(e.target.value))}
          className="text-black"
        />
      </div>
      <div>
        <label className="mr-2">Incident rate %:</label>
        <input
          type="number"
          value={incidentRate}
          onChange={(e) => setIncidentRate(Number(e.target.value))}
          className="text-black"
        />
      </div>
      <div>
        <label className="mr-2">Cost/incident ($):</label>
        <input
          type="number"
          value={costPerIncident}
          onChange={(e) => setCostPerIncident(Number(e.target.value))}
          className="text-black"
        />
      </div>
      <div>
        <label className="mr-2">Wage/hr ($):</label>
        <input
          type="number"
          value={wage}
          onChange={(e) => setWage(Number(e.target.value))}
          className="text-black"
        />
      </div>
      <div>
        <label className="mr-2">Seconds saved:</label>
        <input
          type="number"
          value={secondsSaved}
          onChange={(e) => setSecondsSaved(Number(e.target.value))}
          className="text-black"
        />
      </div>
      <div className="pt-4 border-t mt-4">
        <p>Avoided exposure: ${avoidedExposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        <p>Time savings: ${timeSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        <p>ROI: {roi.toFixed(0)}%</p>
        <p>Payback months: {paybackMonths.toFixed(1)}</p>
      </div>
    </div>
  );
}
