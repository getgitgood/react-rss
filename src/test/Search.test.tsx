import '@testing-library/jest-dom';
import { SearchForm } from '../components/SearchForm/SearchForm';
import { CreateContextMemoryRouter } from './helpers/Routers';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';
import { screen } from '@testing-library/react';

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
    CreateContextMemoryRouter([<SearchForm key={1} />]);
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
    CreateContextMemoryRouter([<SearchForm key={1} />]);
    expect(window.localStorage.getItem).toHaveBeenCalled();
  });
});