import { screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './testHelpers/renderWithProviders';


it('app is inside the DOM', () => {
  renderWithProviders(<App />);
  expect(screen.getByTestId('app')).toBeInTheDocument();
});
