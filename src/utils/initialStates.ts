import { ApiResponse, AppContextProps, DetailsItem, NavData } from '../types';

const initialResponse: ApiResponse = {
  user_platforms: false,
  previous: null,
  results: [],
  next: null,
  count: 0,
  name: ''
};

const initialNavData: NavData = {
  previous: null,
  next: null,
  count: 0,
  name: ''
};

const initialItemData: DetailsItem = {
  reddit_description: '',
  background_image: '',
  metacritic_url: '',
  released: 'n/a',
  description: '',
  platforms: [],
  metacritic: 0,
  playtime: 0,
  genres: [],
  name: '',
  slug: '',
  id: 0
};

const initialAppContext: AppContextProps = {
  setSingleGameData: (initialItemData: DetailsItem) => initialItemData,
  setGamesData: (initialResponse) => initialResponse,
  singleGameData: <DetailsItem>{},
  gamesData: initialResponse
};

export { initialResponse, initialNavData, initialAppContext, initialItemData };
