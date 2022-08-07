import { FC, useCallback } from 'react';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { setDeletedContactId } from '../../store/slices/deleteContact';
import { fetchContactsSelector } from '../../store/slices/fetchContacts';
import { searchDataSelector } from '../../store/slices/search';
import { DELETE_CONTACT } from '../../store/sagas/sagasHelpers/variables';

import ContactItem from '../contactItem/ContactItem';

import './contactList.scss';


const ContactList: FC = () => {
  const { contacts, loading } = useTypedSelector(fetchContactsSelector);
  const { searchData } = useTypedSelector(searchDataSelector);
  const dispatch = useTypedDispatch();

  const deleteContact = useCallback(
    (id: string) => {
      dispatch(setDeletedContactId(id));
      dispatch({ type: DELETE_CONTACT });
    },
    [dispatch],
  );

  const searchedContacts = contacts.filter((contact) => {
    const fullName = `
      ${contact.name.title}
      ${contact.name.first}
      ${contact.name.last}
      ${contact.phone}
      ${contact.email}
      ${String(contact.age)}`;

    return fullName.toLowerCase().includes(searchData.toLowerCase());
  });

  return (
    <div className='contacts'>
      {loading && <p>Loading...</p>}

      {searchedContacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} deleteContact={deleteContact} />
      ))}
    </div>
  );
};


export default ContactList;
