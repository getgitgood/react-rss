import { ApiResponse, NavData } from '../types';

const initialResponse: ApiResponse = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  user_platforms: false,
  name: '',
  pageSize: '10'
};

const initialNavData: NavData = {
  count: 0,
  next: null,
  previous: null,
  name: '',
  pageSize: '10'
};

export { initialResponse, initialNavData };
