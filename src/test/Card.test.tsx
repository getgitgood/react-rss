import '@testing-library/jest-dom';
import * as apiClient from '../api/apiClient';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { RouterContextComponent } from './helpers/Routers';
import CardsList from '../components/CardsList/CardsList';
import App from '../App';
import { Provider } from 'react-redux';
import { mockStore } from './mocks/mockStore';

const url = 'https://rawg.io/api/games?game=specific_game&page_size=1';
const id = 'https://rawg.io/api/games?game=specific_game&name=zelda';

vi.mock('../api/apiClient.ts', () => ({
  makeFetchRequest: vi.fn(async () => {
    const request = await fetch(url);
    const response = await request.json();
    return response;
  }),
  makeDetailsRequest: vi.fn(async () => {
    const request = await fetch(id);
    const response = await request.json();
    return response;
  })
}));

const cardDetails = {
  title: 'The Legend of Zelda: Ocarina of Time',
  rating: '99 / 100',
  genres: ['Action', 'RPG', 'Adventure']
};

describe('Tests for the Card component:', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const user = userEvent.setup();

  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      RouterContextComponent(
        <Provider store={mockStore}>
          <CardsList />
        </Provider>
      )
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
    render(<App />);

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
    const fetchSpy = vi.spyOn(apiClient, 'makeDetailsRequest');

    render(<App />);

    await waitFor(async () => expect(fetchSpy).toHaveBeenCalled());
    await waitFor(async () => {
      const card = await screen.findByTestId('card');
      await user.click(card);
    });
  });
});
