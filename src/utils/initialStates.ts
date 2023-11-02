import { ApiResponse, NavData } from '../types';

const initialResponse: ApiResponse = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  user_platforms: false
};

const initialNavData: NavData = {
  count: 0,
  next: null,
  previous: null
};

export { initialResponse, initialNavData };
