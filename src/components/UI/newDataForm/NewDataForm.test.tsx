import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../testHelpers/renderWithProviders';
import testNewDataProps from '../../../testHelpers/testNewDataProps';
import NewDataForm from './NewDataForm';


const { initialValues, payloadType, setViewForm, contactId } = testNewDataProps;

describe('new data form', () => {
  describe('new data form is inside the DOM and does not close on click on it', () => {
    it('new data form is inside the DOM', () => {
      renderWithProviders(
        <NewDataForm
          initialValues={initialValues}
          payloadType={payloadType}
          setViewForm={setViewForm}
          contactId={contactId}
        />,
      );
      expect(screen.getByTestId('newDataForm')).toBeInTheDocument();
    });

    it('new data form does not close on click on it', async () => {
      renderWithProviders(
        <NewDataForm
          initialValues={initialValues}
          payloadType={payloadType}
          setViewForm={setViewForm}
          contactId={contactId}
        />,
      );
      await userEvent.click(screen.getByTestId('newDataForm'));
      expect(screen.getByTestId('newDataForm')).toBeInTheDocument();
    });
  });

  describe('children', () => {
    it('all children are inside the DOM', () => {
      renderWithProviders(
        <NewDataForm
          initialValues={initialValues}
          payloadType={payloadType}
          setViewForm={setViewForm}
          contactId={contactId}
        />,
      );
      expect(screen.getByPlaceholderText(/set new first name*/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/set new last name*/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/set new email*/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/set new age*/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/set new location/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/set new phone number/i)).toBeInTheDocument();

      expect(screen.getByTestId('newDataFooter')).toBeInTheDocument();
      expect(screen.getByTestId('newDataFooterButton')).toBeInTheDocument();
      expect(screen.getByText(/\* - required fields/i)).toBeInTheDocument();

      expect(screen.getByTestId('closeNewDataForm')).toBeInTheDocument();
    });

    it('inputs are correctly changing', async () => {
      renderWithProviders(
        <NewDataForm
          initialValues={initialValues}
          payloadType={payloadType}
          setViewForm={setViewForm}
          contactId={contactId}
        />,
      );
      expect(screen.getByPlaceholderText(/set new first name*/i)).toHaveValue('');
      await userEvent.type(screen.getByPlaceholderText(/set new first name*/i), 'testNewFirstName');
      expect(screen.getByPlaceholderText(/set new first name*/i)).toHaveValue('testNewFirstName');

      expect(screen.getByPlaceholderText(/set new last name*/i)).toHaveValue('');
      await userEvent.type(screen.getByPlaceholderText(/set new last name*/i), 'testNewLastName');
      expect(screen.getByPlaceholderText(/set new last name*/i)).toHaveValue('testNewLastName');

      expect(screen.getByPlaceholderText(/set new email*/i)).toHaveValue('');
      await userEvent.type(screen.getByPlaceholderText(/set new email*/i), 'testNewEmail');
      expect(screen.getByPlaceholderText(/set new email*/i)).toHaveValue('testNewEmail');

      expect(screen.getByPlaceholderText(/set new age*/i)).toHaveValue(0);
      await userEvent.type(screen.getByPlaceholderText(/set new age*/i), '14');
      expect(screen.getByPlaceholderText(/set new age*/i)).toHaveValue(14);

      expect(screen.getByPlaceholderText(/set new location/i)).toHaveValue('');
      await userEvent.type(screen.getByPlaceholderText(/set new location/i), 'testNewLocation');
      expect(screen.getByPlaceholderText(/set new location/i)).toHaveValue('testNewLocation');

      expect(screen.getByPlaceholderText(/set new phone number/i)).toHaveValue('');
      await userEvent.type(
        screen.getByPlaceholderText(/set new phone number/i),
        'testNewFirstName',
      );
      expect(screen.getByPlaceholderText(/set new phone number/i)).toHaveValue('testNewFirstName');
    });
  });
});
