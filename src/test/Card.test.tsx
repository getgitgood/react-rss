import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RouterContextComponent from './helpers/RouterContext';
import ContentItems from '../components/ContentItems/ContentItems';
import App from '../App';
import * as apiClient from '../api/apiClient';

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

const cardContentExample = {
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
    render(RouterContextComponent(<ContentItems />));

    await waitFor(async () => {
      const card = await screen.findByTestId('cardItem');
      expect(card).toBeInTheDocument();

      expect(card).toHaveTextContent(cardContentExample.title);

      expect(card).toHaveTextContent(cardContentExample.rating);

      cardContentExample.genres.forEach((str) => {
        expect(card).toHaveTextContent(str);
      });
    });
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(<App />);

    await waitFor(async () => {
      const card = await screen.findByTestId('cardItem');
      expect(card).toBeInTheDocument();
      await user.click(card);

      const details = await screen.findByTestId('details');
      expect(details).toBeInTheDocument();
      expect(details).toHaveTextContent(cardContentExample.title);
    });
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const fetchSpy = vi.spyOn(apiClient, 'makeDetailsRequest');

    render(<App />);

    await waitFor(async () => expect(fetchSpy).toBeCalled());
    await waitFor(async () => {
      const card = await screen.findByTestId('cardItem');
      await user.click(card);
    });
  });
});
