import type { AppProps } from 'next/app';
import '../index.scss';
import React from 'react';
import { setupStore } from '../store';
import { Provider } from 'react-redux';
import Header from '../layouts/Header/Header';
import ErrorBoundary from '../utils/ErrorBoundary';

const store = setupStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}
