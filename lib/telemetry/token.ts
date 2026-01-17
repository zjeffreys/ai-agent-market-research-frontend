import { db } from '../db/adapter';
import { TokenUsageSchema } from '../../schemas/tokenUsage';

export async function logTokenUsage(analysisId: string, tokens: number): Promise<void> {
  const usage = TokenUsageSchema.parse({ analysisId, tokens, ts: Date.now() });
  await db.insertTokenUsage(usage);
}

