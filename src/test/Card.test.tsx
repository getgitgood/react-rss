import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './helpers/renderWithProviders';
import mockSSPWithContext from './helpers/utils';
import Index from '../pages';

const cardDetails = {
  title: 'The Legend of Zelda: Ocarina of Time',
  rating: '99 / 100',
  genres: ['Action', 'RPG', 'Adventure']
};
const user = userEvent.setup();

describe('Tests for the Card component:', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    const props = await mockSSPWithContext(['one_game']);

    renderWithProviders(
      <Index
        cardListData={props.cardListData}
        detailsData={props.detailsData}
      />
    );

    await waitFor(async () => {
      const card = await screen.findByTestId('card');
      expect(card).toBeInTheDocument();

      expect(card).toHaveTextContent(cardDetails.title);

      expect(card).toHaveTextContent(cardDetails.rating);

      cardDetails.genres.forEach((str) => {
        expect(card).toHaveTextContent(str);
      });
    });
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    const props = await mockSSPWithContext(['one_game', '10', '25097']);
    renderWithProviders(
      <Index
        cardListData={props.cardListData}
        detailsData={props.detailsData}
      />
    );
    await waitFor(async () => {
      const card = await screen.findByTestId('card');
      expect(card).toBeInTheDocument();
      await user.click(card);
      const details = await screen.findByTestId('details');
      expect(details).toBeInTheDocument();
      expect(details).toHaveTextContent(cardDetails.title);
    });
  });
});
