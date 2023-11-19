import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { vi } from 'vitest';
import { renderWithProviders } from './helpers/renderWithProviders';

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
    const preloadedState = {
      userInputs: {
        searchStr: 'specific_game',
        pageSize: '1'
      },
      id: 25097
    };
    renderWithProviders(<App />, { preloadedState });
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
