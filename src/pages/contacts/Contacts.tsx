import { FC, useEffect } from 'react';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { GET_CONTACTS } from '../../store/sagas/variables';
import { fetchContactsSelector } from '../../store/slices/fetchContacts';


const Contacts: FC = () => {
  const { contacts, loading } = useTypedSelector(fetchContactsSelector);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch({ type: GET_CONTACTS });
  }, [dispatch]);

  return (
    <div>
      { loading && <p>Loading...</p>}
      {
        contacts.map((contact) => (
          <p key={contact.phone}>
            { `${contact.name.first} ${contact.name.last}` }
          </p>
        ))
      }
    </div>
  );
};

export default Contacts;
