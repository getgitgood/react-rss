import { FetchCardsHelper } from '../types';

export const removeTags = (text: string) => {
  if (!text) return false;

  const stringifiedText = text.toString();

  return stringifiedText.replace(/(<([^>]+)>)/gi, '');
};

export const sliceTrailingSlash = (param: string) => {
  if (!param) return false;
  if (param.endsWith('/')) {
    return param.slice(0, -1);
  }
  return param;
};

const RESOURCE_URL = import.meta.env.VITE_RESOURCE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchCardsUrlHelper = ({
  queryStr,
  pageNumber,
  pageSize
}: FetchCardsHelper) => {
  const FETCH_CARDS_FUNC = import.meta.env.VITE_FETCH_CARDS_LAMBDA;

  if (!import.meta.env.DEV) {
    return `${FETCH_CARDS_FUNC}?search=${queryStr}&page=${pageNumber}&page_size=${pageSize}&ordering=-metacritic`;
  }

  return `${RESOURCE_URL}?key=${API_KEY}&search=${queryStr}&page=${pageNumber}&page_size=${pageSize}&ordering=-metacritic`;
};

export const fetchSingleCardUrlHelper = (id: string) => {
  const FETCH_SINGLE_CARD_FUNC = import.meta.env.VITE_FETCH_SINGLE_CARD_LAMBDA;

  if (!import.meta.env.DEV) {
    return `${FETCH_SINGLE_CARD_FUNC}?id=${id}`;
  }
  return `${RESOURCE_URL}/${id}?key=${API_KEY}`;
};
