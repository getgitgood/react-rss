import { http } from 'msw';
import * as mockData from './responses';

export const handlers = [
  http.get(`https://rawg.io/api/games`, async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const param =
      url.searchParams.get('page_size') ??
      url.searchParams.get('name') ??
      'void';
    const value = `${search}&${param}`;
    switch (value) {
      case 'game10&10': {
        return new Response(JSON.stringify(mockData.response10), {
          status: 200
        });
      }
      case 'game20&20': {
        return new Response(JSON.stringify(mockData.response20), {
          status: 200
        });
      }
      case 'game20&10': {
        return new Response(JSON.stringify(mockData.response20), {
          status: 200
        });
      }
      case 'null&whatever': {
        return new Response(JSON.stringify(mockData.noResults), {
          status: 200
        });
      }
      case 'specific_game&1': {
        return new Response(JSON.stringify(mockData.response1), {
          status: 200
        });
      }
      default: {
        return new Response(JSON.stringify('nothing'), { status: 404 });
      }
    }
  }),
  http.get(`https://rawg.io/api/games/25097`, async () => {
    return new Response(JSON.stringify(mockData.specificGame), {
      status: 200
    });
  })
];
