import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import { afterEach, describe, it, vi } from 'vitest';
import RouterContextComponent from './helpers/RouterContext';
import Details from '../components/Details/Details';

const id = 'https://rawg.io/api/games?game=specific_game&name=zelda';
vi.mock('../api/apiClient.ts', () => ({
  makeDetailsRequest: vi.fn(async () => {
    const request = await fetch(id);
    const response = await request.json();
    return response;
  })
}));

vi.mock('../api/apiClient.ts', async () => {
  const actual = await vi.importActual<typeof import('../api/apiClient')>(
    '../api/apiClient.ts'
  );
  return {
    ...actual,
    makeDetailsRequest: vi.fn(async () => {
      const request = await fetch(id);
      const response = await request.json();
      return response;
    })
  };
});

const detailsContentExample = {
  title: 'The Legend of Zelda: Ocarina of Time',
  description:
    'As a young boy, Link is tricked by Ganondorf, the King of the Gerudo Thieves. The evil human uses Link to gain access to the Sacred Realm, where he places his tainted hands on Triforce and transforms the beautiful Hyrulean landscape into a barren wasteland. Link is determined to fix the problems he helped to create, so with the help of Rauru he travels through time gathering the powers of the Seven Sages.',
  released: 'Released: 1998-11-21'
};

describe('Tests for the Detailed Card component:', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // const user = userEvent.setup();

  it('Check that a loading indicator is displayed while fetching data', async () => {
    render(RouterContextComponent(<Details />));

    const loader = screen.getByTestId('loader');
    await waitForElementToBeRemoved(loader);
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(RouterContextComponent(<Details />));
    await waitFor(() => {
      const details = screen.getByTestId('details');
      expect(details).toBeInTheDocument();
      expect(details).toHaveTextContent(detailsContentExample.title);
      expect(details).toHaveTextContent(detailsContentExample.description);
      expect(details).toHaveTextContent(detailsContentExample.released);
    });
  });

  // it('Ensure that clicking the close button hides the component.', async () => {
  //   render(RouterContextComponent(<Details />));
  //   await waitFor(async () => {
  //     const exitBtn = screen.getByTestId('exit_btn');
  //     await user.click(exitBtn);
  //     await waitForElementToBeRemoved(exitBtn);
  //     screen.debug();
  //   });

  // await waitForElementToBeRemoved(exitBtn);
  // });
});
