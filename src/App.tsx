import './index.scss';
import './components/SearchForm/SearchForm';

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import { RootLayout } from './layouts/Root/RootLayout';
import { Content, loader as contentLoader } from './components/Content/Content';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index={true} element={<Content />} loader={contentLoader} />
      <Route
        path={'game=:gameId&page=:id&page_limit=:limit'}
        element={<Content />}
        loader={contentLoader}
      />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
