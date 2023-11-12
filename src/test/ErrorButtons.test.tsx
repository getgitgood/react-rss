import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import Header from '../layouts/Header/Header';
import { CreateContextMemoryRouter } from './helpers/Routers';

describe('Error Buttons', () => {
  it('Render the "throw an Error" button', () => {
    CreateContextMemoryRouter([<Header key={1} />]);
    expect(screen.getByText('Throw an Error.')).toBeInTheDocument();
  });

  it('Render the "throw an Error" button', () => {
    CreateContextMemoryRouter([<Header key={1} />]);
    expect(screen.getByText('Go to 404 Page.')).toBeInTheDocument();
  });
});
