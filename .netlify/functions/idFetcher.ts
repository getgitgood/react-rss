import type { Context } from '@netlify/functions';

export default async function handler(event) {
  const search = event.queryStringParameters.search;
  const apiKey = Netlify.env.get('VITE_API_KEY');
  const url = Netlify.env.get('VITE_URL');

  try {
    const request = await fetch(`${url}/${search}?key=${apiKey}`);

    return {
      statusCode: 200,
      body: JSON.stringify(request)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ e })
    };
  }
}
