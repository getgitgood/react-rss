import {
  PreloadedState,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';

import userInputsReducer from './features/userInputs/userInputsSlice';
import cardsReducer from './features/cards/cardsSlice';

import { apiSlice } from './features/api/apiSlice';

const rootReducer = combineReducers({
  userInputs: userInputsReducer,
  cards: cardsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware)
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
