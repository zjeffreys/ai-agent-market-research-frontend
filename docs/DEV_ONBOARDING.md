# Dev Onboarding

Get the local stack running in under three minutes.

## Quickstart

1. Copy env vars:
   ```bash
   cp .env.example .env
   ```
2. Launch services:
   ```bash
   make up
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Useful Commands
- View logs: `make logs`
- Run tests: `make test`
- Lint code: `make lint`
- Stop services: `make down`

The container mounts your code and `.data/` directory so changes reflect immediately.
