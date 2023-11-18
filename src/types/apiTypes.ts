export interface ApiResponse extends NavData {
  results: SingleCardResponse[] | [];
  user_platforms: boolean;
}

export type NavData = {
  count: number;
  next: string | null;
  previous: string | null;
  name: string;
};

export type FetchParams = {
  queryStr: string;
  pageNumber: string;
};

export interface SingleCardResponse extends Genres {
  description: string;
  background_image: string;
  metacritic: number;
  id: number;
  genres: Genres[];
  platforms: Platforms<Genres>[];
}

export interface DetailedCardResponse extends SingleCardResponse {
  playtime: number;
  released: string;
  metacritic_url: string;
  reddit_description: string;
}

type Genres = {
  id: number;
  name: string;
  slug: string;
};

interface Platforms<T> {
  platform: T;
}

export interface FetchCardsHelper extends FetchParams {
  pageSize: string;
}

export type CardsListQueryFn = {
  searchStr: string;
  page: string | undefined;
  pageSize: string;
};

export type SingleCardQueryFn = {
  id: string | undefined;
};
