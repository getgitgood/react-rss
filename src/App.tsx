import './index.scss';
import './components/SearchForm/SearchForm';

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate
} from 'react-router-dom';

import { RootLayout } from './layouts/Root/RootLayout';
import Content from './components/Content/Content';
import Details from './components/Details/Details';
import NotFound from './layouts/NotFound/NotFound';
import { AppContextProvider } from './components/Context/Context';

const initialSearch = localStorage.getItem('searchStr') || 'all';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'} element={<RootLayout />} errorElement={<NotFound />}>
      <Route
        index
        element={<Navigate to={`&game=${initialSearch}&page=1`} replace />}
      />
      <Route path="&game=:gameId&page=:page" element={<Content />}>
        <Route path="&item=:cardId" element={<Details />} />
      </Route>
    </Route>
  )
);

export default function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />;
    </AppContextProvider>
  );
}
