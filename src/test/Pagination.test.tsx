import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { renderWithProviders } from './helpers/renderWithProviders';
import mockSSPWithContext from './helpers/utils';
import Index from '../pages';

describe('Tests for the Pagination component:', () => {
  it('Make sure the component have a proper href value, so be able to navigate to a next page.', async () => {
    const props = await mockSSPWithContext(['game20size10']);

    renderWithProviders(<Index cardListData={props.cardListData} />);
    await waitFor(async () => {
      const nextBtn = screen.getByTestId('next');
      expect(nextBtn).toBeInTheDocument();
      if ('href' in nextBtn) {
        const url = new URL(nextBtn.href as URL);
        const { pathname } = url;
        const query = url.search;
        expect(`${pathname}${query}`).toBe('/games/all?page=2');
      }
    });
  });
});
