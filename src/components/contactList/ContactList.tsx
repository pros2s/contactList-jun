import { FC, useCallback } from 'react';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { DELETE_CONTACT } from '../../store/sagas/sagasHelpers/variables';
import { setDeletedContactId } from '../../store/slices/deleteContact';
import { fetchContactsSelector } from '../../store/slices/fetchContacts';

import ContactItem from '../contactItem/ContactItem';


const ContactList: FC = () => {
  const { contacts, loading } = useTypedSelector(fetchContactsSelector);
  const dispatch = useTypedDispatch();


  const deleteContact = useCallback((id: string) => {
    dispatch(setDeletedContactId(id));
    dispatch({ type: DELETE_CONTACT });
  }, [dispatch]);


  return (
    <div>
      {loading && <p>Loading...</p>}

      <h1>{contacts.length}</h1>
      {
        contacts.map((contact) => <ContactItem
          key={contact.id}
          contact={contact}
          deleteContact={deleteContact}/>)
      }
    </div>
  );
};


export default ContactList;
