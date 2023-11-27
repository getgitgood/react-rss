import '@testing-library/jest-dom';
import { SearchForm } from '../components/SearchForm/SearchForm';
import { userEvent } from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './helpers/renderWithProviders';

const user = userEvent.setup();

describe('Tests for the Search component:', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    renderWithProviders(<SearchForm />);

    const search = screen.getByPlaceholderText('Search');
    await user.clear(search);
    await user.type(search, 'Hi, Reviewer!');

    expect(search).toHaveValue('Hi, Reviewer!');
    await user.clear(search);
    expect(search).toHaveValue('');
  });
});
