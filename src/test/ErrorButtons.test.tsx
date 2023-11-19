import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './helpers/renderWithProviders';
import App from '../App';

describe('Error Buttons', () => {
  it('Render the "throw an Error" button', () => {
    renderWithProviders(<App />);
    expect(screen.getByText('Throw an Error.')).toBeInTheDocument();
  });

  it('Render the "throw an Error" button', () => {
    renderWithProviders(<App />);
    expect(screen.getByText('Go to 404 Page.')).toBeInTheDocument();
  });
  screen.debug();
});
