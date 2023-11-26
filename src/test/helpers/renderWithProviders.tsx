import { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../../store';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { Context } from 'next-redux-wrapper';

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {} as Context,
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
