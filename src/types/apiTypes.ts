export interface ApiResponse extends NavData {
  results: ResponseItem[] | [];
  user_platforms: boolean;
}

export type NavData = {
  count: number;
  next: string | null;
  previous: string | null;
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
