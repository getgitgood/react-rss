import { AppContextProps, DetailedCardResponse, NavData } from '../types';

const initialResponse = {
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

const initialSingleCardData: DetailedCardResponse = {
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
  setSingleGameData: (initialItemData: DetailedCardResponse) => initialItemData,
  singleGameData: <DetailedCardResponse>{}
};

export {
  initialResponse,
  initialNavData,
  initialAppContext,
  initialSingleCardData
};
