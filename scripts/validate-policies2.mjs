#!/usr/bin/env node

import { readFileSync } from 'fs';
import Ajv from 'ajv';

const [,, filePath] = process.argv;

if (!filePath) {
  console.error('Usage: node scripts/validate-policies2.mjs <file>');
  process.exit(1);
}

const ajv = new Ajv({ allErrors: true });
const schema = JSON.parse(
  readFileSync(new URL('../schemas/policy2.schema.json', import.meta.url), 'utf-8')
);
const validate = ajv.compile(schema);

const data = JSON.parse(readFileSync(filePath, 'utf-8'));

if (validate(data)) {
  console.log('VALID');
} else {
  console.error(JSON.stringify(validate.errors, null, 2));
  process.exit(1);
}
