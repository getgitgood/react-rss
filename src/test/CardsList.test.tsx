import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CardsList from '../components/CardsList/CardsList.js';
import { renderWithProviders } from './helpers/renderWithProviders.js';
import * as dummies from './helpers/mocks/responses.js';
import serverUse from './helpers/serverUse.js';
import { MemoryRouter } from 'react-router-dom';

describe('Tests for the Card List component:', () => {
  it('Verify that the component renders the specified number of cards (10)', async () => {
    const preloadedState = {
      userInputs: {
        searchStr: 'game10',
        pageSize: '10'
      }
    };
    renderWithProviders(
      <MemoryRouter>
        <CardsList />
      </MemoryRouter>,
      { preloadedState }
    );

    await waitFor(async () => {
      const cards = await screen.findAllByTestId('card');
      expect(cards).toHaveLength(10);
    });
  });

  it('Verify that the component renders the specified number of cards (20)', async () => {
    const preloadedState = {
      userInputs: {
        searchStr: 'game20&20',
        pageSize: '20'
      }
    };
    renderWithProviders(
      <MemoryRouter>
        <CardsList />
      </MemoryRouter>,
      { preloadedState }
    );
    await waitFor(async () => {
      const cards = await screen.findAllByTestId('card');
      expect(cards).toHaveLength(20);
    });
  });

  it('Check that an appropriate message is displayed if no cards are present.', async () => {
    serverUse(dummies.noResults, 200);

    renderWithProviders(<CardsList />);

    await waitFor(async () => {
      const notFoundPage = screen.getByTestId('no-results');
      expect(notFoundPage).toBeInTheDocument();
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
