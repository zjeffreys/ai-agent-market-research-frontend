import { detectEntities, Entity } from './redaction';

export type Policy = {
  id: number;
  name: string;
  rules: any[];
};

export function evaluate(text: string, policy: Policy) {
  const { entities } = detectEntities(text);
  return { action: entities.length ? 'MASK' : 'ALLOW', reasons: [], entities, score: entities.length };
}
