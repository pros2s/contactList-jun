import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '../../../testHelpers/renderWithRouterAndProviders';
import PageButton from './PageButton';

const length = 6;
const page = 2;
const index = 1;

const expectedPage = page - length + (2 * index + 1);

it('page button is inside the DOM', async () => {
  renderWithRouterAndProviders(<PageButton arrLength={length} index={index} page={page} />);
  expect(screen.getByRole('button', { name: expectedPage.toString() })).toBeInTheDocument();
});
