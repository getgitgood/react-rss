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
  rating_top: string;
  metacritic_url: string;
};
