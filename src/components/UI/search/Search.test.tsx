import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../testHelpers/renderWithProviders';

import Search from './Search';


describe('search', () => {
  it('search is inside the DOM', () => {
    renderWithProviders(<Search />);
    expect(screen.getByTestId('search')).toBeInTheDocument();
  });

  it('search input is inside the DOM', () => {
    renderWithProviders(<Search />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('search input is changing correctly', async () => {
    renderWithProviders(<Search />);
    await userEvent.type(screen.getByPlaceholderText(/search/i), 'test search value');
    expect(screen.getByPlaceholderText(/search/i)).toHaveValue('test search value');
  });
});
