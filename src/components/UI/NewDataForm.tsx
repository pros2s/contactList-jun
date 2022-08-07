import { FC } from 'react';
import { nanoid } from '@reduxjs/toolkit';

import { Formik } from 'formik';
import * as yup from 'yup';
import { NewContactValues } from '../../types/contacts';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { setEditedContactId, setEditedContactValues } from '../../store/slices/editContact';
import { setContactNewValues } from '../../store/slices/addContact';

import { ADD_NEW_CONTACT, EDIT_CONTACT } from '../../store/sagas/sagasHelpers/variables';
import InputWithError from './InputWithError';


interface NewData {
  firstName: string;
  lastName: string;
  email: string;
}

interface NewDataProps {
  payloadType: string;
  setViewForm: React.Dispatch<React.SetStateAction<boolean>>;
  contactId?: string;
  formName: string;
}

const NewDataForm: FC<NewDataProps> = ({ payloadType, setViewForm, contactId, formName }) => {
  const dispatch = useTypedDispatch();

  const formValidation = yup.object({
    email: yup
      .string()
      .required('Not required')
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Not valid email adress'),

    lastName: yup.string().required('Not required').max(15, 'Maximum 15 symbols'),
    firstName: yup.string().required('Not required').max(15, 'Maximum 15 symbols'),
  });

  const addNewData = (first: string, last: string, email: string, contactId: string) => {
    const newValues: NewContactValues = {
      email: email,
      name: {
        first: first,
        last: last,
      },
      id: nanoid(),
    };
    if (payloadType === EDIT_CONTACT) {
      dispatch(setEditedContactId(contactId));
      dispatch(setEditedContactValues(newValues));
    } else if (payloadType === ADD_NEW_CONTACT) {
      dispatch(setContactNewValues(newValues));
    }
    dispatch({ type: payloadType });

    setViewForm(false);
  };

  return (
    <div>
      <Formik<NewData>
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        validationSchema={formValidation}
        onSubmit={(values, { resetForm }) => {
          addNewData(
            values.firstName,
            values.lastName,
            values.email,
            (contactId = contactId || ''),
          );
          resetForm();
        }}>
        {({ handleSubmit, values, handleChange }) => (
          <div>
            <form onSubmit={handleSubmit}>
              <InputWithError
                maxLength={30}
                type='text'
                name='firstName'
                placeholder='new first name'
                value={values.firstName.trim()}
                onChange={handleChange}
              />

              <InputWithError
                maxLength={30}
                type='text'
                name='lastName'
                placeholder='new last name'
                value={values.lastName.trim()}
                onChange={handleChange}
              />

              <InputWithError
                maxLength={30}
                type='email'
                name='email'
                placeholder='new email'
                value={values.email.trim()}
                onChange={handleChange}
              />

              <button type='submit'>{formName}</button>
            </form>
          </div>
        )}
      </Formik>
      <button type='submit' onClick={() => setViewForm(false)}>
        X
      </button>
    </div>
  );
};


export default NewDataForm;
