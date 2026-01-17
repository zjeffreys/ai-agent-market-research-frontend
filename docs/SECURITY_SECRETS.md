# Secrets Incident Response

This playbook covers actions to take when a secret (API key, password, or token) is exposed.

## Incident Response Steps
1. **Revoke compromised secret** in its issuing service immediately.
2. **Rotate credentials** for any systems that relied on the secret and update environment stores.
3. **Purge artifacts** such as git history or logs that contain the secret.
4. **Audit usage logs** to determine scope and any unauthorized access.
5. **Notify stakeholders** and file an incident report.
6. **Document lessons learned** and add monitoring to prevent recurrence.
