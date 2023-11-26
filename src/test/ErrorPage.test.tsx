import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from './helpers/renderWithProviders';
import mockSSPWithContext from './helpers/utils';
import Index from '../pages';
import ErrorBoundary from '../utils/ErrorBoundary';

describe('Error Page', () => {
  it('Render the Error Page on error thrown', async () => {
    const props = await mockSSPWithContext(['500']);

    renderWithProviders(
      <ErrorBoundary>
        <Index cardListData={props.cardListData} />
      </ErrorBoundary>
    );

    await waitFor(async () => {
      expect(screen.getByTestId('error-page')).toBeInTheDocument();
    });
  });
});
