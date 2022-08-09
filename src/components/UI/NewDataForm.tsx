import { FC, memo } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { RiCloseLine, RiAddLine, RiEdit2Line } from 'react-icons/ri';

import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { setEditedContactId, setEditedContactValues } from '../../store/slices/editContact';
import { fetchContactsSelector, setCurrentPage } from '../../store/slices/fetchContacts';
import { setContactNewValues } from '../../store/slices/addContact';

import { ADD_NEW_CONTACT, EDIT_CONTACT } from '../../store/sagas/sagasHelpers/variables';
import { IContact, NewData } from '../../types/contacts';
import InputWithError from './InputWithError';

import '../addNewContactMenu/addNewContactMenu.scss';
import picture from '../../assets/contact.png';


interface NewDataProps {
  payloadType: string;
  setViewForm: React.Dispatch<React.SetStateAction<boolean>>;
  contactId?: string;
  initialValues: NewData;
}

const NewDataForm: FC<NewDataProps> = memo(
  ({ payloadType, setViewForm, contactId, initialValues }) => {
    const dispatch = useTypedDispatch();
    const { contacts, totalPages, currentPage } = useTypedSelector(fetchContactsSelector);


    const formValidation = yup.object({
      email: yup
        .string()
        .required('Not required')
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Not valid email adress'),

      lastName: yup.string().required('Not required').max(15, 'Maximum 15 symbols'),
      firstName: yup.string().required('Not required').max(15, 'Maximum 15 symbols'),
      phone: yup
        .string()
        .matches(/[0-9]{3}-[0-9]{3}-[0-9]{4}/, 'Format phone number: 123-456-7890'),
    });

    const addNewData = (
      first: string,
      last: string,
      email: string,
      location: string | undefined,
      phone: string | undefined,
      age: number | undefined,
      contactId: string,
    ) => {
      const newValues: IContact = {
        email,
        name: {
          first: first,
          last: last,
        },
        age,
        location,
        phone,
        id: nanoid(),
      };
      if (payloadType === ADD_NEW_CONTACT) {
        newValues.picture = { large: picture };
      }

      if (payloadType === EDIT_CONTACT) {
        dispatch(setEditedContactId(contactId));
        dispatch(setEditedContactValues(newValues));
      } else if (payloadType === ADD_NEW_CONTACT) {
        dispatch(setContactNewValues(newValues));
        contacts.length === 5 && totalPages.toString() === currentPage && dispatch(setCurrentPage(`${totalPages + 1}`));
      }
      dispatch({ type: payloadType });

      setViewForm(false);
    };

    const buttonDataText = (): string => {
      if (payloadType === EDIT_CONTACT) {
        return 'edit'
      } else if (payloadType === ADD_NEW_CONTACT) {
        return 'add'
      }

      return '';
    };


    return (
      <div className='new-data-form' onClick={(e) => e.stopPropagation()}>
        <Formik<NewData>
          initialValues={initialValues}
          validationSchema={formValidation}
          onSubmit={(values, { resetForm }) => {
            addNewData(
              values.firstName,
              values.lastName,
              values.email,
              values.location,
              values.phone,
              values.age,
              (contactId = contactId || ''),
            );
            resetForm();
          }}>
          {({ handleSubmit, values, handleChange }) => (
            <div>
              <Form onSubmit={handleSubmit}>
                <InputWithError
                  className='new-data__field'
                  maxLength={30}
                  type='text'
                  name='firstName'
                  placeholder='set new first name*'
                  value={values.firstName.trim()}
                  onChange={handleChange}
                />

                <InputWithError
                  className='new-data__field'
                  maxLength={30}
                  type='text'
                  name='lastName'
                  placeholder='set new last name*'
                  value={values.lastName.trim()}
                  onChange={handleChange}
                />

                <InputWithError
                  className='new-data__field'
                  maxLength={30}
                  type='text'
                  name='email'
                  placeholder='set new email*'
                  value={values.email.trim()}
                  onChange={handleChange}
                />

                <InputWithError
                  type='text'
                  name='location'
                  placeholder='set new location'
                  value={values.location}
                  onChange={handleChange}
                />

                <InputWithError
                  type='tel'
                  name='phone'
                  pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                  placeholder='set new phone number(123-456-7890)'
                  value={values.phone}
                  onChange={handleChange}
                />

                <InputWithError
                  type='number'
                  min='0'
                  max='200'
                  name='age'
                  placeholder='set new age*'
                  value={values.age}
                  onChange={handleChange}
                />

                <div className='new-data__footer'>
                  <button data-text={buttonDataText()} className='new-data__submit' type='submit'>
                    {payloadType === ADD_NEW_CONTACT && <RiAddLine />}
                    {payloadType === EDIT_CONTACT && <RiEdit2Line />}
                  </button>

                  <p>* - required fields</p>
                </div>
              </Form>
            </div>
          )}
        </Formik>

        <button data-text='close' className='new-data__close' type='submit' onClick={() => setViewForm(false)}>
          <RiCloseLine />
        </button>
      </div>
    );
  },
);


export default NewDataForm;
