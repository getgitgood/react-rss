import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';
import { renderWithProviders } from './helpers/renderWithProviders';
import CardsList from '../components/CardsList/CardsList';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

const user = userEvent.setup();

const GetCurrentPath = () => {
  const location = useLocation();
  return <div data-testid="current-path">{location.pathname}</div>;
};

describe('Tests for the Pagination component:', () => {
  it('Make sure the component updates URL query parameter when page changes.', async () => {
    const preloadedState = {
      userInputs: {
        searchStr: 'game20',
        pageSize: '20'
      }
    };
    renderWithProviders(
      <MemoryRouter>
        <CardsList />
        <Routes>
          <Route path={'/&game=game20&page=2'} element={<GetCurrentPath />} />
        </Routes>
      </MemoryRouter>,
      { preloadedState }
    );
    await waitFor(async () => {
      const nextBtn = screen.getByTestId('next');
      expect(nextBtn).toBeInTheDocument();
      await user.click(nextBtn);
    });
    expect(screen.getByTestId('current-path')).toBeInTheDocument();
  });
});
