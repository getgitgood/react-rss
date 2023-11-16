import { configureStore } from '@reduxjs/toolkit';

import userSearchReducer from '../../features/userSearch';
import userPageSizeReducer from '../../features/userPageSize';

export const mockStore = configureStore({
  reducer: {
    searchStr: userSearchReducer,
    pageSize: userPageSizeReducer
  }
});

export type RootState = ReturnType<typeof mockStore.getState>;
export type AppDispatch = typeof mockStore.dispatch;
