import { nanoid } from '@reduxjs/toolkit';
import { FC, useEffect, useState } from 'react';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import {
  ADD_NEW_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
} from '../../store/sagas/sagasHelpers/variables';
import { setContactNewValues } from '../../store/slices/addContact';
import { setDeletedContactId } from '../../store/slices/deleteContact';
import { fetchContactsSelector } from '../../store/slices/fetchContacts';
import { AdditingValues } from '../../types/contacts';

const Contacts: FC = () => {
  const { contacts, loading } = useTypedSelector(fetchContactsSelector);
  const dispatch = useTypedDispatch();

  const [addition, setAddition] = useState<boolean>(false);
  const [firstNameValue, setFirstNameValue] = useState<string>('');
  const [lastNameValue, setLastNameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');

  useEffect(() => {
    dispatch({ type: GET_CONTACTS });
  }, [dispatch]);

  const deleteContact = (id: string) => {
    dispatch(setDeletedContactId(id));
    dispatch({ type: DELETE_CONTACT });
  };

  const addNewContact = () => {
    const additingValues: AdditingValues = {
      email: emailValue,
      name: {
        first: firstNameValue,
        last: lastNameValue,
      },
      id: nanoid()
    };
    dispatch(setContactNewValues(additingValues));
    dispatch({ type: ADD_NEW_CONTACT });
    dispatch({ type: GET_CONTACTS });

    setAddition(false);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}

      {addition ? (
        <div>
          <form>
            <input
              value={firstNameValue}
              onChange={(e) => setFirstNameValue(e.target.value)}
              type='text'
              placeholder='first name'
            />
            <input
              value={lastNameValue}
              onChange={(e) => setLastNameValue(e.target.value)}
              type='text'
              placeholder='last name'
            />
            <input
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              type='text'
              placeholder='email'
            />

            <button type='submit' onClick={() => addNewContact()}>
              Add
            </button>
          </form>
        </div>
      ) : (
        <button onClick={() => setAddition(true)}>Add new Contact</button>
      )}

      <h1>{contacts.length}</h1>
      {contacts.map((contact) => (
        <div style={{ display: 'flex' }} key={contact.id}>
          <img src={ contact.picture?.thumbnail } alt="contactAvatar" />
          <p>{`${contact.name?.first} ${contact.name?.last}`}</p>

          <button onClick={() => deleteContact(contact.id)} style={{ height: 30 }}>
            don't delete me, bruh
          </button>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
