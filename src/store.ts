import {
  PreloadedState,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';

import formReducer from './features/formSlice';
import countriesReducer from './features/countriesSlice';

const rootReducer = combineReducers({
  reactForm: formReducer,
  countries: countriesReducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
