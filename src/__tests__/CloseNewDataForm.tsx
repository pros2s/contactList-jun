import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../testHelpers/renderWithProviders';
import testNewDataProps from '../testHelpers/testNewDataProps';

import NewDataForm from '../components/UI/newDataForm/NewDataForm';


const { initialValues, payloadType, setViewForm, contactId } = testNewDataProps;

it('new data form closes on click close or submit button', async () => {
  renderWithProviders(
    <NewDataForm
      initialValues={initialValues}
      payloadType={payloadType}
      setViewForm={setViewForm}
      contactId={contactId}
    />,
  );
  expect(screen.getByTestId('newDataForm')).toBeInTheDocument();
  await userEvent.click(screen.getByTestId('closeNewDataForm'));
  expect(screen.queryByTestId('editMenu')).not.toBeInTheDocument();
  expect(screen.queryByTestId('additionalForm')).not.toBeInTheDocument();
});
