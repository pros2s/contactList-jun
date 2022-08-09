import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../testHelpers/renderWithProviders';
import Pagination from './Pagination';


it('pagination is inside the DOM', () => {
  renderWithProviders(<Pagination />);
  expect(screen.getByRole('list')).toBeInTheDocument();
});
