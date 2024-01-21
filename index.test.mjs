import { createServer } from 'node:http';
import router from './index.mjs';
import assert from 'node:assert';
import { mock, describe, it } from 'node:test';

function setup() {
  const routes = {
    'GET /one/:two/three/{four}': mock.fn((_, res, args) => res.end(JSON.stringify(args))),
    'POST /test': mock.fn((_, res, args) => res.end(JSON.stringify(args))),
  };

  const handler = router(routes);
  const port = ~~(Math.random() * 1000) + 3000;
  const server = createServer(handler);

  server.listen(port);

  return { server, port, routes };
}

describe('dispatch requests', () => {
  it('should dispatch a GET request', async () => {
    const { server, routes, port } = setup();
    const url = `http://localhost:${port}/one/2/three/4`;

    const response = await fetch(url);
    const text = await response.text();
    server.close();

    assert.ok(routes['POST /test'].mock.calls.length === 0, 'post request was called');

    const args = routes['GET /one/:two/three/{four}'].mock.calls[0].arguments;
    assert.deepStrictEqual(args[2], { two: '2', four: '4' });
    assert.ok(text === '{"two":"2","four":"4"}', 'fdf');

    mock.reset();
  });
});
