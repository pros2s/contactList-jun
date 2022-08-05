import { render, screen } from '@testing-library/react';
import Contacts from './Contacts';

describe('Contacts', () => {
  it('Inside the DOM', () => {
    render(<Contacts />);
    const contactsDiv = screen.getByText(/List of contacts/i);
    expect(contactsDiv).toBeInTheDocument();
  });
});
