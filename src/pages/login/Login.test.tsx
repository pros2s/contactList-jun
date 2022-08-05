import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '../../testHelpers/renderWithRouterAndProviders';
import Login from './Login';


describe('Login', () => {
  it('button inside the DOM', () => {
    renderWithRouterAndProviders(<Login />);
    expect(screen.getByRole('button', { name: /let's go/i })).toBeInTheDocument();
  });
});
