import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, BaseQueryFn } from '../../types';
const BASE_URL = import.meta.env.VITE_RESOURCE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const apiSlice = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getGames: builder.query<ApiResponse, BaseQueryFn>({
      query: ({ searchStr, page, pageSize }) =>
        `?key=${API_KEY}&search=${searchStr}&page=${page}&page_size=${pageSize}&ordering=-metacritic`
    }),
    getGameById: builder.query({
      query: (id) => `/${id}?key=${API_KEY}`
    })
  })
});

export const { useGetGamesQuery, useGetGameByIdQuery } = apiSlice;
