import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter
} from 'react-router-dom';
import { AppContextProvider } from '../../components/Context/Context';
import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from '../mocks/mockStore';

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
    <Provider store={mockStore}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export { RouterContextComponent, CreateContextMemoryRouter };
