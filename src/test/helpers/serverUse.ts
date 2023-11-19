import { http } from 'msw';
import { server } from './mocks/server';

const serverUse = (mock: object, status: number) => {
  server.resetHandlers();
  server.use(
    http.get('*', () => {
      return new Response(JSON.stringify(mock), {
        status: status
      });
    })
  );
};

export default serverUse;
