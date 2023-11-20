import {
  PreloadedState,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';

import userInputsReducer from './features/userInputs/userInputsSlice';
import cardsListReducer from './features/cards/cardsListSlice';
import singleCardReducer from './features/cards/singleCardSlice';
import loadersReducer from './features/loadings/loadersSlice';
import singleCardIdReducer from './features/id/cardIdSlice';

import { apiSlice } from './features/api/apiSlice';

const rootReducer = combineReducers({
  userInputs: userInputsReducer,
  cardsList: cardsListReducer,
  singleCard: singleCardReducer,
  loadings: loadersReducer,
  id: singleCardIdReducer,
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
