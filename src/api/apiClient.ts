import { ApiResponse } from '../types';

const apiKey = '2de256abeb6040da91f0216d56988978';

export async function makeFetchRequest({
  queryStr = '',
  pageSize = '20',
  pageNumber = '1'
}) {
  const searchStr = localStorage.getItem('searchStr') ?? queryStr;
  try {
    const request = await fetch(
      `https://rawg.io/api/games?key=${apiKey}&page_size=${pageSize}&search=${searchStr}&page=${pageNumber}&ordering=-metacritic`
    );
    const response: ApiResponse = await request.json();
    console.log(queryStr);
    return { response, pageNumber, queryStr };
  } catch (e) {
    throw e;
  }
}

export async function makePageRequest(link: string) {
  try {
    const request = await fetch(link);
    const response: ApiResponse = await request.json();
    return response;
  } catch (e) {
    throw e;
  }
}
