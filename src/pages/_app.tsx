import type { AppProps } from 'next/app';
import '../index.scss';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { setupStore } from '../store';
import { Provider } from 'react-redux';
import Header from '../layouts/Header/Header';
import ErrorBoundary from '../utils/ErrorBoundary';
import { NextPage } from 'next';
import router from 'next/router';

const store = setupStore();

export default function App({ Component, pageProps }: AppProps) {
  const [isDebounced, setDebounced] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setDebounced(true);
    };
    const handleRouteChangeEnd = () => {
      setDebounced(false);
    };
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
    };
  }, [isDebounced, setDebounced]);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div className={isDebounced ? 'loading-overlay' : ''}>
          <Header />
          <Component {...pageProps} />
        </div>
      </ErrorBoundary>
    </Provider>
  );
}

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
