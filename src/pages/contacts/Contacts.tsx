import { FC, useEffect } from 'react';
import AddNewContactMenu from '../../components/addNewContactMenu/AddNewContactMenu';
import ContactList from '../../components/contactList/ContactList';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';

import { GET_CONTACTS } from '../../store/sagas/sagasHelpers/variables';


const Contacts: FC = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch({ type: GET_CONTACTS });
  }, [dispatch]);


  return (
    <div>
      <AddNewContactMenu />
      <ContactList />
    </div>
  );
};


export default Contacts;
