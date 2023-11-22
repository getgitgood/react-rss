import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import CardsList from '../components/CardsList/CardsList.js';
import { renderWithProviders } from './helpers/renderWithProviders.js';
import { MemoryRouter } from 'react-router-dom';
import setUserInputState from './helpers/preloadedStates.js';

describe('Tests for the Card List component:', () => {
  it('Verify that the component renders the specified number of cards (10)', async () => {
    const preloadedState = setUserInputState('game10', '10');
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
    const preloadedState = setUserInputState('game20', '20');
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
    const preloadedState = setUserInputState('null', 'whatever');
    renderWithProviders(
      <MemoryRouter>
        <CardsList />
      </MemoryRouter>,
      { preloadedState }
    );

    await waitFor(async () => {
      const notFoundPage = screen.getByTestId('no-results');
      expect(notFoundPage).toBeInTheDocument();
    });
  });
});
