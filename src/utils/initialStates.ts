import { ApiResponse, NavData } from '../types';

const initialResponse: ApiResponse = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  user_platforms: false,
  name: ''
};

const initialNavData: NavData = {
  count: 0,
  next: null,
  previous: null,
  name: ''
};

export { initialResponse, initialNavData };
