import { http } from 'msw';
import * as mockData from './responses';

export const handlers = [
  http.get(`https://rawg.io/api/games`, async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    switch (search) {
      case 'game10': {
        return new Response(JSON.stringify(mockData.response10), {
          status: 200
        });
      }
      case 'game20': {
        return new Response(JSON.stringify(mockData.response20), {
          status: 200
        });
      }
      case 'game20size10': {
        return new Response(JSON.stringify(mockData.response20), {
          status: 200
        });
      }
      case 'void': {
        return new Response(JSON.stringify(mockData.noResults), {
          status: 200
        });
      }
      case 'one_game': {
        return new Response(JSON.stringify(mockData.response1), {
          status: 200
        });
      }
      case '404': {
        return new Response(JSON.stringify('not found'), { status: 404 });
      }
      case '500': {
        return new Response(JSON.stringify('server error'), { status: 500 });
      }
      default: {
        return new Response(JSON.stringify('default'), { status: 200 });
      }
    }
  }),
  http.get(`https://rawg.io/api/games/25097`, async () => {
    return new Response(JSON.stringify(mockData.specificGame), {
      status: 200
    });
  })
];
