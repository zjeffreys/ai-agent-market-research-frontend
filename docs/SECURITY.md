# Security

## API Keys & Rate Limits
- Protected API routes require `Authorization: Bearer <SGAI_API_KEY>`.
- Requests are limited to 60 per 5 minutes per IP.
- Exceeding the limit returns `429` with a `Retry-After` header.
