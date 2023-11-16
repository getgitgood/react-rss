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
  setItemData: (initialItemData: DetailsItem) => initialItemData,
  handleLimitChange: (selectedLimit: string) => selectedLimit,
  setKeyword: (newKeyword: string) => newKeyword,
  setData: (initialResponse) => initialResponse,
  setLimit: (newLimit: string) => newLimit,
  itemData: <DetailsItem>{},
  data: initialResponse,
  keyword: '',
  limit: ''
};

export { initialResponse, initialNavData, initialAppContext, initialItemData };
