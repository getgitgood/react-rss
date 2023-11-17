import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../../features/api/apiSlice';
import userInputsReducer from '../../features/userInputs/userInputsSlice';
import cardsListReducer from '../../features/cardsData/cardsListSlice';

export const mockStore = configureStore({
  reducer: {
    userInputs: userInputsReducer,
    cardsList: cardsListReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof mockStore.getState>;
export type AppDispatch = typeof mockStore.dispatch;
