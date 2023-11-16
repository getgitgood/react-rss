import '@testing-library/jest-dom';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppContextProvider } from '../components/Context/Context';
import Page404 from '../layouts/Page404/Page404';
import App from '../App';
import { vi } from 'vitest';

const url = 'https://rawg.io/api/games?game=game20&page_size=10';

vi.mock('../api/apiClient.ts', () => ({
  makeFetchRequest: vi.fn(async () => {
    const request = await fetch(`${url}`);
    const response = await request.json();
    return response;
  })
}));

describe('404 Page component:', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <App />
        },
        {
          path: '*',
          element: <Page404 />
        }
      ],
      { initialEntries: ['/somebadpath'] }
    );
    render(
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    );
    expect(screen.queryByTestId('page-404')).toBeInTheDocument();
  });

  it('Ensure that the 404 page is displayed when navigating to an invalid route via button click', async () => {
    render(<App />);

    const throwButton = screen.getByTestId('throw404');
    expect(throwButton).toBeInTheDocument();
    expect(screen.queryByTestId('page-404')).not.toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(throwButton);
    expect(screen.queryByTestId('page-404')).toBeInTheDocument();
  });
});
