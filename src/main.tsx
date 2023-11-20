import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import ErrorBoundary from './utils/ErrorBoundary';
import { Provider } from 'react-redux';
import { setupStore } from './store';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
