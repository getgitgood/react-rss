import { ApiResponse } from '../types';

const apiKey = '2de256abeb6040da91f0216d56988978';

export async function makeFetchRequest({ queryStr = '', pageNumber = '1' }) {
  const searchStr = localStorage.getItem('searchStr') ?? queryStr;
  const pageSize = localStorage.getItem('pageLimit');
  try {
    const request = await fetch(
      `https://rawg.io/api/games?key=${apiKey}&page_size=${pageSize}&search=${searchStr}&page=${pageNumber}&ordering=-metacritic`
    );
    const response: ApiResponse = await request.json();
    return { response, pageNumber, queryStr, pageSize };
  } catch (e) {
    throw e;
  }
}

export async function makeDetailsRequest(id: string | undefined) {
  const url = `https://rawg.io/api/games/${id}?key=${apiKey}`;
  try {
    const request = await fetch(url);
    const response: ApiResponse = await request.json();
    return response;
  } catch (e) {
    throw e;
  }
}
