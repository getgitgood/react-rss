import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import App from '../App';

const user = userEvent.setup();

const url = 'https://rawg.io/api/games?game=game20&page_size=10';

vi.mock('../api/apiClient.ts', () => ({
  makeFetchRequest: vi.fn(async () => {
    const request = await fetch(`${url}`);
    const response = await request.json();
    return response;
  })
}));

beforeEach(() => {
  /* Note to reviewer:
  Console error was disabled for this one particular test 
  case so as not to spoil visual of terminal output :). */
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('Error Page', () => {
  it('Render the Error Page on error thrown', async () => {
    render(<App />);
    const errorBtn = screen.getByText('Throw an Error.');
    await user.click(errorBtn);
    expect(screen.getByTestId('error-page')).toBeInTheDocument();
  });
});
