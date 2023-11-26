import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { renderWithProviders } from './helpers/renderWithProviders.js';
import mockSSPWithContext from './helpers/utils.js';
import CardsList from '../components/CardsList/CardsList.js';

describe('Tests for the Card List component:', () => {
  it('Verify that the component renders the specified number of cards (10)', async () => {
    const props = await mockSSPWithContext(['game10']);

    renderWithProviders(<CardsList cardListData={props.cardListData} />);

    await waitFor(async () => {
      const cards = await screen.findAllByTestId('card');
      expect(cards).toHaveLength(10);
    });
  });

  it('Verify that the component renders the specified number of cards (20)', async () => {
    const props = await mockSSPWithContext(['game20']);

    renderWithProviders(<CardsList cardListData={props.cardListData} />);

    await waitFor(async () => {
      const cards = await screen.findAllByTestId('card');
      expect(cards).toHaveLength(20);
    });
  });

  it('Check that an appropriate message is displayed if no cards are present.', async () => {
    const props = await mockSSPWithContext(['void']);

    renderWithProviders(<CardsList cardListData={props.cardListData} />);

    await waitFor(async () => {
      const notFoundPage = screen.getByTestId('no-results');
      expect(notFoundPage).toBeInTheDocument();
    });
  });
});
