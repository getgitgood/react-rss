import { ApiResponse, ResponseItem } from '../types';

const apiKey = '2de256abeb6040da91f0216d56988978';

export default async function makeFetchRequest(searchStr: string) {
  try {
    const request = await fetch(
      `https://rawg.io/api/games?token&key=${apiKey}&search=${searchStr}&ordering=-metacritic`
    );
    const response: ApiResponse = await request.json();
    const results: ResponseItem[] = response.results;
    return results;
  } catch (e) {
    throw e;
  }
}
