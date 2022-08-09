import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../../testHelpers/renderWithRouter';
import Logout from './Logout';


describe('logout', () => {
  it('logout is inside the DOM', () => {
    renderWithRouter(<Logout />);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('logout icon is inside the DOM', () => {
    renderWithRouter(<Logout />);
    expect(screen.getByTestId('logoutSVG')).toBeInTheDocument();
  });
});
