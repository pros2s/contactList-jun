import { FC, useEffect } from 'react';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { DELETE_CONTACT, GET_CONTACTS } from '../../store/sagas/sagasHelpers/variables';
import { setDeletedContactId } from '../../store/slices/deleteContact';
import { fetchContactsSelector } from '../../store/slices/fetchContacts';


const Contacts: FC = () => {
  const { contacts, loading } = useTypedSelector(fetchContactsSelector);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch({ type: GET_CONTACTS });
  }, [dispatch]);


  const deleteContact = (id: string) => {
    dispatch(setDeletedContactId(id));
    dispatch({ type: DELETE_CONTACT });
    dispatch({ type: GET_CONTACTS });
  };


  return (
    <div>
      {loading && <p>Loading...</p>}
      
      <h1>{contacts.length}</h1>
      {contacts.map((contact) => (
        <div style={{ display: 'flex' }} key={contact.phone}>
          <p>{`${contact.name.first} ${contact.name.last}`}</p>

          <button onClick={() => deleteContact(contact.id)} style={{ height: 30 }}>
            don't delete me, bruh
          </button>
        </div>
      ))}
    </div>
  );
};


export default Contacts;
