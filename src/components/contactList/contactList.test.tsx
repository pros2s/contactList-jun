import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../testHelpers/renderWithProviders"
import ContactList from "./ContactList"


describe('contact list', () => {
  it('contact list is inside the DOM', () => {
    renderWithProviders(<ContactList />);
    expect(screen.getByTestId('contacts')).toBeInTheDocument();
  })
})