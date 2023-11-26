import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import Header from '../layouts/Header/Header';
import { renderWithProviders } from './helpers/renderWithProviders';

describe('Error Buttons', () => {
  it('Render the "throw an Error" button', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Throw an Error.')).toBeInTheDocument();
  });

  it('Render the "throw an Error" button', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Go to 404 Page.')).toBeInTheDocument();
  });
});
