# CI/CD Pipeline

The project uses GitHub Actions to enforce code quality and security.

## Lint

- Runs `npm run lint` for ESLint using `.eslintrc.cjs`.
- Runs `npm run format:check` to ensure no Prettier diffs.
- Validates required environment variables with `npm run env:check`.
- **Silencing false positives:**
  - ESLint: `// eslint-disable-next-line <rule>`.
  - Prettier: `// prettier-ignore` or add paths to `.prettierignore`.
  - Env check: mark variables as optional in `lib/env.ts`.

## Unit Tests

- Executes `npm test` (Vitest).
- **Silencing false positives:** use `// @vitest-ignore` when necessary.

## End-to-End Tests

- Executes `npm run test:e2e` with Playwright.
- Requires a production build.

## CodeQL

- Security and static analysis via CodeQL.
- **Silencing false positives:** add a `// codeql[<query-id>]` comment.

## Secret Scanning

- `gitleaks` runs in `secret-scanning.yml` to detect committed secrets.
- **Silencing false positives:** list patterns in `.gitleaksignore`.

## Dependabot

- Weekly dependency updates for `npm` packages and GitHub Actions.

## Running locally

```bash
npm run lint
npm run format:check
npm run env:check # set env vars; see .env.example
npm test
npm run test:e2e
npx gitleaks detect --no-git
```

To simulate GitHub Actions locally, install [`act`](https://github.com/nektos/act) and run:

```bash
act pull_request
```
