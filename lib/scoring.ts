import { Entity } from './redaction';

export function summary(entities: Entity[]) {
  return {
    total: entities.length,
    types: Array.from(new Set(entities.map((e) => e.type)))
  };
}
