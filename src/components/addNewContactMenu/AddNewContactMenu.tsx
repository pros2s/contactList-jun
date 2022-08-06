import { FC, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';

import { ADD_NEW_CONTACT, GET_CONTACTS } from '../../store/sagas/sagasHelpers/variables';
import { setContactNewValues } from '../../store/slices/addContact';

import { NewContactValues } from '../../types/contacts';


const AddNewContactMenu: FC = () => {
  const dispatch = useTypedDispatch();

  const [addition, setAddition] = useState<boolean>(false);
  const [firstNameValue, setFirstNameValue] = useState<string>('');
  const [lastNameValue, setLastNameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');

  const addNewContact = () => {
    const additingValues: NewContactValues = {
      email: emailValue,
      name: {
        first: firstNameValue,
        last: lastNameValue,
      },
      id: nanoid(),
    };
    dispatch(setContactNewValues(additingValues));
    dispatch({ type: ADD_NEW_CONTACT });
    dispatch({ type: GET_CONTACTS });

    setAddition(false);
    setFirstNameValue('');
    setLastNameValue('');
    setEmailValue('');
  };

  return (
    <div>
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
    </div>
  );
};

export default AddNewContactMenu;
