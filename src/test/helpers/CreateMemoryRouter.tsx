import { ReactNode } from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { AppContextProvider } from '../../components/Context/Context';
import { render } from '@testing-library/react';

const CreateMemoryRouter = (arg: ReactNode) => {
  const router = createMemoryRouter([{ path: '/', element: arg }]);
  render(
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
  return router;
};

export default CreateMemoryRouter;
