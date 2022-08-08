import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndProviders } from '../../testHelpers/renderWithRouterAndProviders';
import AddNewContactMenu from './AddNewContactMenu';

describe('addContactMenu', () => {
  it('add new contact menu inside the DOM', () => {
    renderWithRouterAndProviders(<AddNewContactMenu />);
    expect(screen.getByTestId('addNewContact')).toBeInTheDocument();
  });

  it('add new contact button inside the DOM', () => {
    renderWithRouterAndProviders(<AddNewContactMenu />);
    expect(screen.getByTestId('addNewContactButton')).toBeInTheDocument();
  });

  it('additional menu opens on click', async () => {
    renderWithRouterAndProviders(<AddNewContactMenu />);
    await userEvent.click(screen.getByTestId('addNewContactButton'));
    expect(screen.getByTestId('additionalForm')).toBeInTheDocument();
    expect(screen.queryByText(/Too much pages/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Too much contacts on this page/i)).not.toBeInTheDocument();
  });

  it('additional menu closes on click itself', async () => {
    renderWithRouterAndProviders(<AddNewContactMenu />);
    await userEvent.click(screen.getByTestId('addNewContactButton'));
    expect(screen.getByTestId('additionalForm')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('additionalForm'));
    expect(screen.queryByTestId('additionalForm')).not.toBeInTheDocument();
  });
});
