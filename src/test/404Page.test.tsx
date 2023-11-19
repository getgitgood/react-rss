import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {
  renderWithProviders,
  renderWithProvidersAndRouter
} from './helpers/renderWithProviders';
import Page404 from '../layouts/Page404/Page404';
import { server } from './helpers/mocks/server';

describe('404 Page component:', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    renderWithProvidersAndRouter(
      {},
      [<App key={1} />, <Page404 key={2} />],
      ['/somebadpath', '*']
    );
    expect(screen.queryByTestId('page-404')).toBeInTheDocument();
    server.close();
  });

  it('Ensure that the 404 page is displayed when navigating to an invalid route via button click', async () => {
    renderWithProviders(<App />);

    const throwButton = screen.getByTestId('throw404');
    expect(throwButton).toBeInTheDocument();
    expect(screen.queryByTestId('page-404')).not.toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(throwButton);
    expect(screen.queryByTestId('page-404')).toBeInTheDocument();
    server.close();
  });
});
