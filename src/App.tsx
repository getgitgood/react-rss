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
import { Content, contentLoader } from './components/Content/Content';
import { Details, detailsLoader } from './components/Details/Details';
import NotFound from './layouts/NotFound/NotFound';

const prev = localStorage.getItem('searchStr') || 'all';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'} element={<RootLayout />} errorElement={<NotFound />}>
      <Route index element={<Navigate to={`game=${prev}&page=1`} replace />} />
      <Route
        path="game=:gameId&page=:id"
        element={<Content />}
        loader={contentLoader}
      >
        <Route
          path="details/:cardId"
          element={<Details />}
          loader={detailsLoader}
        />
      </Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
