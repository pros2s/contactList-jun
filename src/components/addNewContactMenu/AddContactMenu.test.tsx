import { screen } from "@testing-library/react";
import { renderWithRouterAndProviders } from "../../testHelpers/renderWithRouterAndProviders";
import AddNewContactMenu from "./AddNewContactMenu"


describe('addContactMenu', () => {
  it('add new contact menu inside the DOM', () => {
    renderWithRouterAndProviders(<AddNewContactMenu />);
    expect(screen.getByTestId('addNewContact')).toBeInTheDocument();
  })
})