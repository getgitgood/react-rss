import { configureStore } from '@reduxjs/toolkit';

import userInputsReducer from './features/userInputs/userInputsSlice';
import cardsListReducer from './features/cardsData/cardsListSlice';

import { apiSlice } from './features/api/apiSlice';

export const store = configureStore({
  reducer: {
    userInputs: userInputsReducer,
    cardsList: cardsListReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
