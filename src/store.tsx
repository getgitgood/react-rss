import { configureStore } from '@reduxjs/toolkit';

import userInputsReducer from './features/userInputs/userInputsSlice';
import cardsListReducer from './features/cards/cardsListSlice';
import singleCardReducer from './features/cards/singleCardSlice';

import { apiSlice } from './features/api/apiSlice';

export const store = configureStore({
  reducer: {
    userInputs: userInputsReducer,
    cardsList: cardsListReducer,
    singleCard: singleCardReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
