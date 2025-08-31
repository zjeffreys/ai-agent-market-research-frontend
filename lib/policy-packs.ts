import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';
import schema from '../schemas/policy2.schema.json';

export type PolicyRule = {
  id: string | number;
  name: string;
  scope: Record<string, any>;
  matchers: Record<string, any>[];
  action: string;
  severity: string;
  explain: string;
};

const ajv = new Ajv();
const validate = ajv.compile<PolicyRule>(schema as any);

export const POLICY_PACKS = ['hipaa', 'gdpr', 'pci'] as const;
export type PolicyPackName = typeof POLICY_PACKS[number];

export async function loadPolicyPack(name: PolicyPackName): Promise<PolicyRule[]> {
  const file = path.join(process.cwd(), 'data', 'policy-packs', `${name}.json`);
  const raw = await fs.promises.readFile(file, 'utf-8');
  const json = JSON.parse(raw);
  if (!Array.isArray(json)) {
    throw new Error('Policy pack must be an array of rules');
  }
  for (const rule of json) {
    if (!validate(rule)) {
      throw new Error(`Invalid rule in ${name}: ${ajv.errorsText(validate.errors)}`);
    }
  }
  return json as PolicyRule[];
}

export async function listPolicyPacks() {
  return Promise.all(
    POLICY_PACKS.map(async (name) => ({ name, rules: await loadPolicyPack(name) }))
  );
}
