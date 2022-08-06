import { nanoid } from '@reduxjs/toolkit';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Formik } from 'formik';
import * as yup from 'yup';

import { EDIT_CONTACT, GET_CONTACTS } from '../../store/sagas/sagasHelpers/variables';
import { setEditedContactId, setEditedContactValues } from '../../store/slices/editContact';

import { NewContactValues, IContact } from '../../types/contacts';
import InputWithError from '../UI/InputWithError';


interface EditForm {
  editFirstName: string,
  editLastName: string,
  editEmail: string
}

interface ContactItemProps {
  contact: IContact;
  deleteContact: (id: string) => void;
}

const ContactItem: FC<ContactItemProps> = ({ contact, deleteContact }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const dispatch = useDispatch();

  const formValidation = yup.object({
    editEmail: yup
      .string()
      .required('Not required')
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Not valid email adress'),

      editLastName: yup.string().required('Not required').max(15, 'Maximum 15 symbols'),
      editFirstName: yup.string().required('Not required').max(15, 'Maximum 15 symbols')
    });

  const editContact = (id: string, first: string, last: string, email: string) => {
    const editingValues: NewContactValues = {
      email: email,
      name: {
        first: first,
        last: last,
      },
      id: nanoid(),
    };
    dispatch(setEditedContactId(id));
    dispatch(setEditedContactValues(editingValues));
    dispatch({ type: EDIT_CONTACT });
    dispatch({ type: GET_CONTACTS })

    setEditing(false);
  };

  return (
    <div style={{ display: 'flex' }} key={contact.id}>
      <img src={contact.picture?.thumbnail} alt='contactAvatar' />
      <p>{`${contact.name?.first} ${contact.name?.last}`}</p>

      <button onClick={() => deleteContact(contact.id)} style={{ height: 30 }}>
        don't delete me, bruh
      </button>


      {editing ? (
        <div>
          <Formik<EditForm>
            initialValues={{
              editFirstName: '',
              editLastName: '',
              editEmail: ''
            }}
            validationSchema={formValidation}
            onSubmit={(values, { resetForm }) => {
              editContact(contact.id, values.editFirstName, values.editLastName, values.editEmail)
              resetForm();
            }}>
            {({ handleSubmit, values, handleChange }) => (
              <div>
                <form onSubmit={handleSubmit}>
                  <h1>Log in</h1>
                  <InputWithError
                    maxLength={30}
                    type='text'
                    name='editFirstName'
                    placeholder='new first name'
                    value={values.editFirstName.trim()}
                    onChange={handleChange}
                  />

                  <InputWithError
                    maxLength={30}
                    type='text'
                    name='editLastName'
                    placeholder='new last name'
                    value={values.editLastName.trim()}
                    onChange={handleChange}
                  />

                  <InputWithError
                    maxLength={30}
                    type='email'
                    name='editEmail'
                    placeholder='new email'
                    value={values.editEmail.trim()}
                    onChange={handleChange}
                  />


                  <button type='submit'>
                    Edit
                  </button>
                </form>
                <button type='submit' onClick={() => setEditing(false)}>
                  X
                </button>
              </div>
            )}
          </Formik>
        </div>
      ) : (
        <button onClick={() => setEditing(true)}>u gonna edit me?</button>
      )}
    </div>
  );
};


export default ContactItem;
