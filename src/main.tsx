import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import ErrorBoundary from './utils/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
