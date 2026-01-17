export interface RoiInputs {
  seats: number;
  promptsPerUserPerDay: number;
  incidentRatePercent: number;
  costPerIncident: number;
  wagePerHour: number;
  secondsSavedPerPrompt: number;
  licenseCostPerSeatPerMonth: number;
}

export interface RoiOutputs {
  totalPromptsPerDay: number;
  incidentsPerYear: number;
  avoidedExposure: number;
  hoursSavedPerYear: number;
  timeSavings: number;
  annualBenefits: number;
  annualCost: number;
  roi: number;
  paybackMonths: number;
}

export function calculateRoi(inputs: RoiInputs): RoiOutputs {
  const totalPromptsPerDay = inputs.seats * inputs.promptsPerUserPerDay;
  const incidentsPerYear = totalPromptsPerDay * 365 * (inputs.incidentRatePercent / 100);
  const avoidedExposure = incidentsPerYear * inputs.costPerIncident;

  const hoursSavedPerYear = totalPromptsPerDay * 365 * (inputs.secondsSavedPerPrompt / 3600);
  const timeSavings = hoursSavedPerYear * inputs.wagePerHour;

  const annualBenefits = avoidedExposure + timeSavings;
  const annualCost = inputs.seats * inputs.licenseCostPerSeatPerMonth * 12;
  const roi = annualCost > 0 ? ((annualBenefits - annualCost) / annualCost) * 100 : 0;
  const paybackMonths = annualBenefits > 0 ? (annualCost * 12) / annualBenefits : 0;

  return {
    totalPromptsPerDay,
    incidentsPerYear,
    avoidedExposure,
    hoursSavedPerYear,
    timeSavings,
    annualBenefits,
    annualCost,
    roi,
    paybackMonths,
  };
}
