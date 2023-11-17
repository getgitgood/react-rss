import { configureStore } from '@reduxjs/toolkit';

import userSearchReducer from '../../features/userInputs/userSearch';
import userPageSizeReducer from '../../features/userInputs/userPageSize';

export const mockStore = configureStore({
  reducer: {
    searchStr: userSearchReducer,
    pageSize: userPageSizeReducer
  }
});

export type RootState = ReturnType<typeof mockStore.getState>;
export type AppDispatch = typeof mockStore.dispatch;
