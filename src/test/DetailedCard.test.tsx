import {
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithProviders } from './helpers/renderWithProviders';
import Details from '../components/Details/Details';
import { MemoryRouter } from 'react-router-dom';
import setUserInputState, {
  preloadedCardsState
} from './helpers/preloadedStates';

const detailedCard = {
  title: 'The Legend of Zelda: Ocarina of Time',
  description:
    'As a young boy, Link is tricked by Ganondorf, the King of the Gerudo Thieves. The evil human uses Link to gain access to the Sacred Realm, where he places his tainted hands on Triforce and transforms the beautiful Hyrulean landscape into a barren wasteland. Link is determined to fix the problems he helped to create, so with the help of Rauru he travels through time gathering the powers of the Seven Sages.',
  released: 'Released: 1998-11-21'
};

describe('Tests for the Detailed Card component:', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    const preloadedState = setUserInputState('specific_game', '1');
    renderWithProviders(<App />, { preloadedState });

    const loader = screen.getByTestId('loader');
    await waitForElementToBeRemoved(loader);
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const preloadedState = {
      cards: {
        ...preloadedCardsState,
        id: '25097'
      }
    };
    renderWithProviders(
      <MemoryRouter>
        <Details />
      </MemoryRouter>,
      { preloadedState }
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
    renderWithProviders(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    await waitFor(async () => {
      const exitBtn = screen.getByTestId('exit_btn');
      const details = screen.getByTestId('details');
      expect(details).toBeInTheDocument();
      await user.click(exitBtn);
      expect(details).not.toBeInTheDocument();
    });
  });
});
