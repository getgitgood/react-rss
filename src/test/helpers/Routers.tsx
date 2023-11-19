import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { ReactNode } from 'react';

const MemoryRouterWrapper = (
  [...args]: ReactNode[],
  [...entries] = ['/', '*'],
  initialEntry = '/'
) => {
  const [arg1, arg2] = [...args];
  const [entry1, entry2] = [...entries];
  const routes = [
    {
      path: entry1,
      element: arg1
    },
    {
      path: entry2,
      element: arg2 ?? <div />
    }
  ];

  const router = createMemoryRouter(routes, { initialEntries: [initialEntry] });

  return <RouterProvider router={router} />;
};

export { MemoryRouterWrapper };
