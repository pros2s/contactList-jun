import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../testHelpers/renderWithRouter';
import NotFound from './NotFound';


describe('Contacts', () => {
  it('Inside the DOM', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByTestId('notFound')).toBeInTheDocument();
    expect(screen.getByText(/404/)).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(screen.getByTestId('notFoundFooter')).toBeInTheDocument();
    expect(screen.getByTestId('notFoundFooterBack')).toBeInTheDocument();
    expect(screen.getByText(/You can go back/i)).toBeInTheDocument();
    expect(screen.getByTestId('notFoundFooterLogin')).toBeInTheDocument();
    expect(screen.getByText(/or to login page/i)).toBeInTheDocument();
  });
});
