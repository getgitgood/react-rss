import { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RootState, setupStore } from '../../store';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { PreloadedState } from '@reduxjs/toolkit';
import { MemoryRouterWrapper } from './Routers';

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {} as MockPreloadState,
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderWithProvidersAndRouter(
  {
    preloadedState = {} as MockPreloadState,
    store = setupStore(preloadedState)
  } = {},
  [...args]: ReactNode[],
  initialEntries?: string[]
) {
  setupListeners(store.dispatch);
  const router = MemoryRouterWrapper([...args], initialEntries);
  function Wrapper() {
    return <Provider store={store}>{router}</Provider>;
  }

  return { store, ...render(Wrapper()) };
}

export type MockPreloadState = Pick<
  PreloadedState<RootState>,
  'userInputs' | 'cards'
>;
