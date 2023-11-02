import { ApiResponse } from '../types';

const apiKey = '2de256abeb6040da91f0216d56988978';

export async function makeInitialRequest() {
  const memoStr = localStorage.getItem('searchStr') ?? '';
  try {
    const request = await fetch(
      `https://rawg.io/api/games?key=${apiKey}&search=${memoStr}&ordering=-metacritic`
    );
    const response: ApiResponse = await request.json();
    // console.log(response);
    return response;
  } catch (e) {
    throw e;
  }
}

export async function makeFetchRequest(searchStr: string) {
  try {
    const request = await fetch(
      `https://rawg.io/api/games?key=${apiKey}&search=${searchStr}&ordering=-metacritic`
    );
    const response: ApiResponse = await request.json();
    // console.log(response);
    return response;
  } catch (e) {
    throw e;
  }
}
