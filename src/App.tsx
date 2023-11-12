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
import ContentItems from './components/ContentItems/ContentItems';
import Details from './components/Details/Details';
import ErrorPage from './layouts/ErrorPage/ErrorPage';
import { AppContextProvider } from './components/Context/Context';
import Page404 from './layouts/Page404/Page404';

const initialSearch = localStorage.getItem('searchStr') || 'all';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={'/'} element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route
          index
          element={<Navigate to={`&game=${initialSearch}&page=1`} replace />}
        />
        <Route path="&game=:gameId&page=:page" element={<ContentItems />}>
          <Route path="&item=:cardId" element={<Details />} />
        </Route>
      </Route>
      <Route path={'*'} element={<Page404 />} />
    </>
  )
);

export default function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />;
    </AppContextProvider>
  );
}
