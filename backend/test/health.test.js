import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';
test('GET /api/health returns ok', async () => {
  const server = app.listen(0);
  try {
    const port = server.address().port;
    const response = await fetch(`http://127.0.0.1:${port}/api/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'ok', service: 'sdd-commerce-api' });
  } finally { await new Promise(resolve => server.close(resolve)); }
});
