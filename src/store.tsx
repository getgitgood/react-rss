import { configureStore } from '@reduxjs/toolkit';

import userSearchReducer from './features/userInputs/userSearch';
import userPageSizeReducer from './features/userInputs/userPageSize';

export const store = configureStore({
  reducer: {
    searchStr: userSearchReducer,
    pageSize: userPageSizeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
