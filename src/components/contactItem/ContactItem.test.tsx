import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../testHelpers/renderWithProviders';
import { IContact } from '../../types/contacts';
import ContactItem from './ContactItem';


const testContact: IContact = {
  email: 'test@email.ru',
  id: '22',
  name: {
    first: 'first',
    last: 'last',
  },
};

const testFunction = jest.fn();


describe('contact item', () => {
  it('contact is inside the DOM', () => {
    renderWithProviders(<ContactItem contact={testContact} deleteContact={testFunction} />);
    expect(screen.getByTestId('contact')).toBeInTheDocument();
    expect(screen.getByTestId('contactData')).toBeInTheDocument();
  });

  it('contact avatar is inside the DOM', () => {
    renderWithProviders(<ContactItem contact={testContact} deleteContact={testFunction} />);
    expect(screen.getByAltText(/contactAvatar/i)).toBeInTheDocument();
  });

  it('contact info is inside the DOM', () => {
    renderWithProviders(<ContactItem contact={testContact} deleteContact={testFunction} />);
    expect(screen.getByTestId('contactDataInfo')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/address/i)).toBeInTheDocument();
    expect(screen.getByText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/age/i)).toBeInTheDocument();
  });

  it('contact crud is in the DOM', () => {
    renderWithProviders(<ContactItem contact={testContact} deleteContact={testFunction} />);
    expect(screen.getByTestId('contactCrud')).toBeInTheDocument();
    expect(screen.getByTestId('contactCrudEdit')).toBeInTheDocument();
    expect(screen.getByTestId('contactCrudDelete')).toBeInTheDocument();
  });

  it('edit menu opens on click edit button and closes on click itself', async () => {
    renderWithProviders(<ContactItem contact={testContact} deleteContact={testFunction} />);
    expect(screen.queryByTestId('editMenu')).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId('editButton'));
    expect(screen.getByTestId('editMenu')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('editMenu'));
    expect(screen.queryByTestId('editMenu')).not.toBeInTheDocument();
  });

  it('contact deletes on click delete button', async () => {
    renderWithProviders(<ContactItem contact={testContact} deleteContact={testFunction} />);
    await userEvent.click(screen.getByTestId('deleteButton'));
    expect(testFunction).toHaveBeenCalledTimes(1);
  });
});
