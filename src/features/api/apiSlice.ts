import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ApiResponse,
  CardsListQueryFn,
  DetailedCardResponse,
  SingleCardQueryFn
} from '../../types';
import { HYDRATE } from 'next-redux-wrapper';
const BASE_URL = 'https://rawg.io/api/games';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const apiSlice = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getGames: builder.query<ApiResponse, CardsListQueryFn>({
      query: ({ searchStr, pageSize, page }) =>
        `?key=${API_KEY}&search=${searchStr}&page=${page}&page_size=${pageSize}&ordering=-metacritic`
    }),
    getGameById: builder.query<DetailedCardResponse, SingleCardQueryFn>({
      query: ({ id }) => `/${id}?key=${API_KEY}`
    })
  })
});

export const { useGetGamesQuery, useGetGameByIdQuery } = apiSlice;
