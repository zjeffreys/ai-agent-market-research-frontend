'use client';
import { useState } from 'react';
import assumptions from '@/data/roiAssumptions.json';

export default function RoiCalculator() {
  const [seats, setSeats] = useState(10);
  const costAvoided = seats * assumptions.breachCostPerSeat;
  return (
    <div className="border rounded p-4 text-sm">
      <label>Seats:</label>
      <input
        type="number"
        value={seats}
        onChange={(e) => setSeats(Number(e.target.value))}
        className="ml-2 text-black"
      />
      <p className="mt-2">Estimated annual savings: ${costAvoided.toLocaleString()}</p>
    </div>
  );
}
