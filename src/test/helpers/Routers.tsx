import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter
} from 'react-router-dom';
import { AppContextProvider } from '../../components/Context/Context';
import { ReactNode } from 'react';
import { render } from '@testing-library/react';

const RouterContextComponent = (children: ReactNode) => {
  return (
    <MemoryRouter>
      <AppContextProvider>{children}</AppContextProvider>
    </MemoryRouter>
  );
};

const CreateContextMemoryRouter = (
  [...args]: ReactNode[],
  initialEntry = '/'
) => {
  const [arg1, arg2] = [...args];
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: arg1
      },
      {
        path: '*',
        element: arg2 ?? <div />
      }
    ],
    { initialEntries: [initialEntry] }
  );

  return render(
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
};

export { RouterContextComponent, CreateContextMemoryRouter };
