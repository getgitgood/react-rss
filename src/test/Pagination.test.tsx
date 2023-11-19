import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, it, vi } from 'vitest';
import App from '../App';
import { renderWithProviders } from './helpers/renderWithProviders';

const url = 'https://rawg.io/api/games?game=game20&page_size=10';

vi.mock('../api/apiClient.ts', () => ({
  makeFetchRequest: vi.fn(async () => {
    const request = await fetch(`${url}`);
    const response = await request.json();
    return response;
  })
}));

afterEach(() => {
  vi.restoreAllMocks();
});

const user = userEvent.setup();

describe('Tests for the Pagination component:', () => {
  it('Make sure the component updates URL query parameter when page changes.', async () => {
    const preloadedState = {
      userInputs: {
        searchStr: 'specific_game',
        pageSize: '1'
      },
      id: 25097
    };
    renderWithProviders(<App />, { preloadedState });
    await waitFor(async () => {
      const pageNum = new URLSearchParams(window.location.href).get('page');
      const nextBtn = screen.getByTestId('next');
      expect(nextBtn).toBeInTheDocument();
      await user.click(nextBtn).then(() => expect(pageNum).toBe('2'));
    });
  });
});
