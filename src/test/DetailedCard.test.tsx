import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './helpers/renderWithProviders';
import Details from '../components/Details/Details';
import mockSSPWithContext from './helpers/utils';
import { DetailedCardResponse } from '../types';

const detailedCard = {
  title: 'The Legend of Zelda: Ocarina of Time',
  description:
    'As a young boy, Link is tricked by Ganondorf, the King of the Gerudo Thieves. The evil human uses Link to gain access to the Sacred Realm, where he places his tainted hands on Triforce and transforms the beautiful Hyrulean landscape into a barren wasteland. Link is determined to fix the problems he helped to create, so with the help of Rauru he travels through time gathering the powers of the Seven Sages.',
  released: 'Released: 1998-11-21'
};

const user = userEvent.setup();

describe('Tests for the Detailed Card component:', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const props = await mockSSPWithContext(['one_game', '10', '25097']);
    renderWithProviders(
      <Details detailsData={props.detailsData as DetailedCardResponse} />
    );

    await waitFor(async () => {
      const details = screen.getByTestId('details');
      expect(details).toBeInTheDocument();
      expect(details).toHaveTextContent(detailedCard.title);
      expect(details).toHaveTextContent(detailedCard.description);
      expect(details).toHaveTextContent(detailedCard.released);
    });
  });

  it('Ensure that clicking the close button hides the component.', async () => {
    const props = await mockSSPWithContext(['one_game', '10', '25097']);
    renderWithProviders(
      <Details detailsData={props.detailsData as DetailedCardResponse} />
    );

    await waitFor(async () => {
      const exitBtn = screen.getByTestId('exit_btn');
      const details = screen.getByTestId('details');
      expect(details).toBeInTheDocument();
      await user.click(exitBtn);
      expect(details).not.toBeInTheDocument();
    });
  });
});
