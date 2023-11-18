import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CardsList from '../components/CardsList/CardsList.js';
import { RouterContextComponent } from './helpers/Routers.js';
import { Provider } from 'react-redux';
import { mockStore } from './mocks/mockStore.js';

let url = ``;

vi.mock('../api/apiClient.ts', () => ({
  makeFetchRequest: vi.fn(async () => {
    const request = await fetch(`${url}`);
    const response = await request.json();
    return response;
  })
}));

describe('Tests for the Card List component:', () => {
  it('Verify that the component renders the specified number of cards (10)', async () => {
    url = 'https://rawg.io/api/games?game=game10&page_size=10';

    render(
      RouterContextComponent(
        <Provider store={mockStore}>
          <CardsList />
        </Provider>
      )
    );

    await waitFor(async () => {
      const cards = await screen.findAllByTestId('card');
      expect(cards).toHaveLength(10);
    });
  });

  it('Verify that the component renders the specified number of cards (20)', async () => {
    url = 'https://rawg.io/api/games?game=game20&page_size=20';

    render(
      RouterContextComponent(
        <Provider store={mockStore}>
          <CardsList />
        </Provider>
      )
    );

    await waitFor(async () => {
      const cards = await screen.findAllByTestId('card');
      expect(cards).toHaveLength(20);
    });
  });

  it('Check that an appropriate message is displayed if no cards are present.', async () => {
    url = `https://rawg.io/api/games?game=nothing&page_size=whatever`;

    render(
      RouterContextComponent(
        <Provider store={mockStore}>
          <CardsList />
        </Provider>
      )
    );

    await waitFor(async () => {
      const notFoundPage = screen.getByTestId('no-results');
      expect(notFoundPage).toBeInTheDocument();
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
