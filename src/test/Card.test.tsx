import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import {
  renderWithProviders,
  renderWithProvidersAndRouter
} from './helpers/renderWithProviders';
import CardsList from '../components/CardsList/CardsList';
import { MemoryRouter } from 'react-router-dom';
import Details from '../components/Details/Details';
import { vi } from 'vitest';
import * as spyOnIdQuery from '../features/api/apiSlice';
import setUserInputState from './helpers/preloadedStates';

const cardDetails = {
  title: 'The Legend of Zelda: Ocarina of Time',
  rating: '99 / 100',
  genres: ['Action', 'RPG', 'Adventure']
};

describe('Tests for the Card component:', () => {
  const user = userEvent.setup();

  it('Ensure that the card component renders the relevant card data', async () => {
    const preloadedState = setUserInputState('specific_game', '1');

    renderWithProviders(
      <MemoryRouter>
        <CardsList />
      </MemoryRouter>,
      { preloadedState }
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
    const preloadedState = setUserInputState('specific_game', '1');

    renderWithProvidersAndRouter({ preloadedState }, [
      <CardsList key={1} />,
      <Details key={2} />
    ]);

    await waitFor(async () => {
      const card = await screen.findByTestId('card');
      expect(card).toBeInTheDocument();
      await user.click(card);
      const details = await screen.findByTestId('details');
      expect(details).toBeInTheDocument();
      expect(details).toHaveTextContent(cardDetails.title);
    });
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const spy = vi.spyOn(spyOnIdQuery, 'useGetGameByIdQuery');
    const preloadedState = setUserInputState('specific_game', '1');

    renderWithProvidersAndRouter({ preloadedState }, [
      <CardsList key={1} />,
      <Details key={2} />
    ]);

    await waitFor(async () => {
      const card = await screen.findByTestId('card');
      await user.click(card);
      expect(spy).toHaveBeenCalled();
    });
  });
});
