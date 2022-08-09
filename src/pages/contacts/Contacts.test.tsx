import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '../../testHelpers/renderWithRouterAndProviders';
import Contacts from './Contacts';

describe('Contacts', () => {
  it('Inside the DOM', () => {
    renderWithRouterAndProviders(<Contacts />);
    expect(screen.getByTestId('contactsPage')).toBeInTheDocument();
    expect(screen.getByTestId('contactsInner')).toBeInTheDocument();
    expect(screen.getByTestId('contactsHeader')).toBeInTheDocument();
    expect(screen.getByTestId('contactsRightSideHeader')).toBeInTheDocument();
    expect(screen.getByTestId('contactsFooter')).toBeInTheDocument();
  });
});
