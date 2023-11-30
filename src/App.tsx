import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import Main from './layouts/Main/Main';
import UncontrolForm from './layouts/UncontrolledForm/UncontrolForm';
import ReactForm from './layouts/ReactForm/ReactForm';
import Layout from './layouts/Layout/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Main />} />
      <Route path="/uncontrol-form" element={<UncontrolForm />} />
      <Route path="/react-form" element={<ReactForm />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
