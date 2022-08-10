import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testHelpers/renderWithProviders';

import ContactItem from '../components/contactItem/ContactItem';
import Search from '../components/UI/search/Search';
import { IContact } from '../types/contacts';


const contact: IContact = {
  email: 'test@email.ru',
  id: '100000',
  name: {
    first: 'test',
    last: 'name',
  },
  age: 10,
  location: 'test location',
  phone: '123-456-7890',
};

const deleteFunction = jest.fn();

it('only contacts with name equals search input value render', async () => {
  renderWithProviders(<Search />);
  renderWithProviders(<ContactItem contact={contact} deleteContact={deleteFunction} />);

  await userEvent.type(screen.getByPlaceholderText(/search/i), 'test');
  expect(screen.getByText(/test@email.ru/i)).toBeInTheDocument();
  expect(screen.getByText(/10/i)).toBeInTheDocument();
  expect(screen.getByText(/test location/i)).toBeInTheDocument();
  expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 3, name: /test name/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { level: 3, name: /testtest/i })).not.toBeInTheDocument();

  await userEvent.type(screen.getByPlaceholderText(/search/i), 'test name');
  expect(screen.getByText(/test@email.ru/i)).toBeInTheDocument();
  expect(screen.getByText(/10/i)).toBeInTheDocument();
  expect(screen.getByText(/test location/i)).toBeInTheDocument();
  expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 3, name: /test name/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { level: 3, name: /testtest/i })).not.toBeInTheDocument();

  await userEvent.type(screen.getByPlaceholderText(/search/i), 'test@email.ru');
  expect(screen.getByText(/test@email.ru/i)).toBeInTheDocument();
  expect(screen.getByText(/10/i)).toBeInTheDocument();
  expect(screen.getByText(/test location/i)).toBeInTheDocument();
  expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 3, name: /test name/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { level: 3, name: /testtest/i })).not.toBeInTheDocument();

  await userEvent.type(screen.getByPlaceholderText(/search/i), '10');
  expect(screen.getByText(/test@email.ru/i)).toBeInTheDocument();
  expect(screen.getByText(/10/i)).toBeInTheDocument();
  expect(screen.getByText(/test location/i)).toBeInTheDocument();
  expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 3, name: /test name/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { level: 3, name: /testtest/i })).not.toBeInTheDocument();

  await userEvent.type(screen.getByPlaceholderText(/search/i), 'test location');
  expect(screen.getByText(/test@email.ru/i)).toBeInTheDocument();
  expect(screen.getByText(/10/i)).toBeInTheDocument();
  expect(screen.getByText(/test location/i)).toBeInTheDocument();
  expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 3, name: /test name/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { level: 3, name: /testtest/i })).not.toBeInTheDocument();

  await userEvent.type(screen.getByPlaceholderText(/search/i), '123-456-7890');
  expect(screen.getByText(/test@email.ru/i)).toBeInTheDocument();
  expect(screen.getByText(/10/i)).toBeInTheDocument();
  expect(screen.getByText(/test location/i)).toBeInTheDocument();
  expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 3, name: /test name/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { level: 3, name: /testtest/i })).not.toBeInTheDocument();
});
