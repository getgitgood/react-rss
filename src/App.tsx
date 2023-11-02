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
import { loader as formLoader } from './components/SearchForm/SearchForm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index={true} element={<Content />} loader={contentLoader} />
      <Route
        path={'/search'}
        element={<Content />}
        action={formLoader}
        loader={contentLoader}
      />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
