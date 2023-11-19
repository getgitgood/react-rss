import { server } from './helpers/mocks/server';
import { beforeAll, afterAll, afterEach } from 'vitest';

beforeAll(() => {
  server.resetHandlers();
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
});
