export interface ApiResponse extends NavData {
  results: ResponseItem[] | [];
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

export interface ResponseItem extends Genres {
  description: string;
  background_image: string;
  metacritic: number;
  id: number;
  genres: Genres[];
  platforms: Platforms<Genres>[];
}

export interface DetailsItem extends ResponseItem {
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
