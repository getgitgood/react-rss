import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, it, vi } from 'vitest';
import App from '../App';
import { mockStore } from './mocks/mockStore';
import { Provider } from 'react-redux';

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
    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );
    await waitFor(async () => {
      const pageNum = new URLSearchParams(window.location.href).get('page');
      const nextBtn = screen.getByTestId('next');
      expect(nextBtn).toBeInTheDocument();
      await user.click(nextBtn).then(() => expect(pageNum).toBe('2'));
    });
  });
});
