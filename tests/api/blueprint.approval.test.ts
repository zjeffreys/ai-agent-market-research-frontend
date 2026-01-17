import { describe, it, expect } from 'vitest';
import { GET } from '../../app/api/mock/[resource]/route';

describe('blueprint approval', () => {
  it('blocks unapproved blueprint access', async () => {
    const req = new Request('http://localhost/api/mock/blueprint');
    const res = await GET(req, { params: { resource: 'blueprint' } });
    expect(res.status).toBe(403);
  });
});
