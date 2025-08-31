import { describe, it, expect } from 'vitest';
import { calculateRoi } from '../../lib/roi2/calc';

describe('calculateRoi', () => {
  it('computes ROI metrics', () => {
    const inputs = {
      seats: 100,
      promptsPerUserPerDay: 20,
      incidentRatePercent: 5,
      costPerIncident: 100,
      wagePerHour: 40,
      secondsSavedPerPrompt: 30,
      licenseCostPerSeatPerMonth: 25,
    };
    const result = calculateRoi(inputs);
    expect(result.totalPromptsPerDay).toBe(2000);
    expect(result.avoidedExposure).toBe(3650000);
    expect(result.roi).toBeCloseTo(12877.8, 1);
    expect(result.paybackMonths).toBeCloseTo(0.0925, 4);
  });
});
