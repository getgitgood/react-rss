import { LoaderFunctionArgs } from 'react-router-dom';

export interface ApiResponse extends NavData {
  results: ResponseItem[] | [];
  user_platforms: boolean;
}

export type NavData = {
  current?: string;
  count: number;
  next: string | null;
  previous: string | null;
  name: string;
};

export type LoaderResults = {
  response: ApiResponse;
  pageNumber: string;
  queryStr: string;
  request?: LoaderFunctionArgs;
};

export interface ResponseItem extends Genres {
  description: string;
  background_image: string;
  metacritic: number;
  metacritic_url: string;
  genres: Genres[];
  platforms: Platforms<Genres>[];
}

type Genres = {
  id: number;
  name: string;
  slug: string;
};

interface Platforms<T> {
  platform: T;
}
