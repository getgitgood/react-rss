import {
  PreloadedState,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';

import uncontrolFormReducer from './features/uncontrolFormSlice';
import reactFormReducer from './features/reactFormSlice';
import countriesReducer from './features/countriesSlice';

const rootReducer = combineReducers({
  uncontrolForm: uncontrolFormReducer,
  reactForm: reactFormReducer,
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
