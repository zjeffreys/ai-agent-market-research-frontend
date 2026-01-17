import fs from 'fs';
import path from 'path';

export interface TokenBudgetConfig {
  limit: number;
}

const defaultConfigPath = path.join(process.cwd(), 'token-budget.json');

export function loadTokenBudgetConfig(configPath = defaultConfigPath): TokenBudgetConfig {
  const raw = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(raw);
}

export class TokenBudget {
  private used = 0;
  private limit: number;

  constructor(limit?: number) {
    if (limit === undefined) {
      const config = loadTokenBudgetConfig();
      this.limit = config.limit;
    } else {
      this.limit = limit;
    }
  }

  track(tokens: number) {
    this.used += tokens;
    if (this.used > this.limit) {
      throw new Error(`Token budget exceeded: ${this.used} > ${this.limit}`);
    }
    return this.used;
  }
}
