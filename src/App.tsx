import './index.scss';
import './components/SearchForm/SearchForm';

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import { RootLayout } from './layouts/Root/RootLayout';
import { Content, contentLoader } from './components/Content/Content';
import { Details, detailsLoader } from './components/Details/Details';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={'/'} element={<RootLayout />}>
        <Route index element={<Content />} loader={contentLoader} />

        <Route path={'/'} element={<Content />} loader={contentLoader}>
          <Route
            path="details/:cardId"
            element={<Details />}
            loader={detailsLoader}
          />
        </Route>
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
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
