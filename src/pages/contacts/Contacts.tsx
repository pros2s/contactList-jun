import { FC, useEffect } from 'react';

import AddNewContactMenu from '../../components/addNewContactMenu/AddNewContactMenu';
import ContactList from '../../components/contactList/ContactList';
import Error from '../../components/UI/errors/error/Error';
import Pagination from '../../components/UI/pagination/Pagination';
import Search from '../../components/UI/search/Search';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { GET_CONTACTS } from '../../store/sagas/sagasHelpers/variables';
import { fetchContactsSelector } from '../../store/slices/fetchContacts';

import './contacts.scss';


const Contacts: FC = () => {
  const dispatch = useTypedDispatch();
  const { error } = useTypedSelector(fetchContactsSelector);

  useEffect(() => {
    dispatch({ type: GET_CONTACTS });
  }, [dispatch]);

  return (
    <div className='contact-page'>
      {
      error ? (
        <Error message='Error with fetch contacts' />
      ) :
        <div className='contact-page__inner'>
          <header>
            <AddNewContactMenu />
            <Search />
          </header>
          <ContactList />
          <footer>
            <Pagination />
          </footer>
        </div>
      }
    </div>
  );
};


export default Contacts;
