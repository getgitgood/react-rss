import {
  PreloadedState,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';

import userInputsReducer from './features/userInputs/userInputsSlice';
import cardsReducer from './features/cards/cardsSlice';

import { apiSlice } from './features/api/apiSlice';
import { Context, createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  userInputs: userInputsReducer,
  cards: cardsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

export function setupStore(context?: Context) {
  const preloadedState = determinePreloadedStateFromContext(context);
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware)
  });
}

function determinePreloadedStateFromContext(
  context?: Context
): PreloadedState<RootState> {
  let initialState = {};
  if (context) {
    initialState = {
      userInputs: {
        searchStr: '',
        pageSize: '10'
      },
      ...context
    };
  }
  return initialState;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
