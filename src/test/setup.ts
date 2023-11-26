import { server } from './server/setupServer';
import { beforeAll, afterAll, afterEach, vi } from 'vitest';

beforeAll(() => {
  server.resetHandlers();
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

vi.mock('next/router', () => {
  return {
    useRouter: () => ({
      query: {},
      push: () => {}
    })
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});
