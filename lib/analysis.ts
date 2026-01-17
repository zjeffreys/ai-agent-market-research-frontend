import { TokenBudget } from './token-budget';

export function analyze(text: string, budget = new TokenBudget()) {
  const tokens = text.trim().split(/\s+/).length;
  budget.track(tokens);
  // placeholder for real analysis logic
  return { tokens };
}
