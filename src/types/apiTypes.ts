export type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResponseItem[] | [];
  user_platforms: boolean;
};

export type ResponseItem = {
  id: number;
  slug: string;
  name: string;
  description: string;
  background_image: string;
  metacritic: number;
  metacritic_url: string;
  genres: Genres[];
  platforms: Platforms<Genres>[];
};

interface Genres {
  id: number;
  name: string;
  slug: string;
}

interface Platforms<T> {
  platform: T;
}
