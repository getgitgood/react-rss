import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';
import { SearchForm } from '../components/SearchForm/SearchForm';
import CreateMemoryRouter from './helpers/CreateMemoryRouter';

const user = userEvent.setup();

Object.setPrototypeOf(window.localStorage.setItem, vi.fn());
vi.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');

Object.setPrototypeOf(window.localStorage.getItem, vi.fn());
vi.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');

beforeEach(() => {
  vi.clearAllMocks();
});
beforeAll(() => {
  vi.clearAllMocks();
});

describe('Pagination component', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    CreateMemoryRouter(<SearchForm />);
    const search = screen.getByPlaceholderText('Search');
    await user.clear(search);
    await user.type(search, 'Hi, Reviewer!');
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'searchStr',
      'Hi, Reviewer!'
    );

    expect(localStorage.getItem('searchStr')).toBe('Hi, Reviewer!');
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    CreateMemoryRouter(<SearchForm />);
    expect(window.localStorage.getItem).toHaveBeenCalled();
  });
});
