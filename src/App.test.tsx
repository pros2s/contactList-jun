import { screen } from '@testing-library/react';

import { renderWithProviders } from './testHelpers/renderWithProviders';
import App from './App';


test('App', () => {
  renderWithProviders(<App />);
  expect(screen.getByTestId('app')).toBeInTheDocument();
});
