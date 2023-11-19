import { server } from './helpers/mocks/server';
import { beforeAll, afterAll, afterEach } from 'vitest';

beforeAll(() => {
  server.resetHandlers();
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());
