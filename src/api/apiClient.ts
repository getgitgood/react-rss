import { ApiResponse, FetchParams } from '../types';

const apiKey = import.meta.env.VITE_API_KEY;
const url = import.meta.env.VITE_URL;
const netlifyUrl = import.meta.env.NETLIFY_URL;

export async function makeFetchRequest({ queryStr, pageNumber }: FetchParams) {
  const pageSize = localStorage.getItem('pageLimit');

  let queryUrl = `?key=${apiKey}&page_size=${pageSize}&search=${queryStr}&page=${pageNumber}&ordering=-metacritic`;

  if (!import.meta.env.DEV) {
    queryUrl = `${netlifyUrl}searchFetcher?search=${queryStr}&page=${pageNumber}&ordering=-metacritic`;
  }

  try {
    const request = await fetch(`${url}${queryUrl}`);
    const response = await request.json();

    return { response, pageNumber, queryStr, pageSize };
  } catch (e) {
    throw e;
  }
}

export async function makeDetailsRequest(id: string | undefined) {
  let queryUrl = `${url}/${id}?key=${apiKey}`;

  if (!import.meta.env.DEV) {
    queryUrl = `${netlifyUrl}idFetcher?search=${id}`;
  }

  try {
    const request = await fetch(queryUrl);
    const response: ApiResponse = await request.json();

    return response;
  } catch (e) {
    throw e;
  }
}
