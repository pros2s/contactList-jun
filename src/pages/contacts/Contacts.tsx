import { FC, useEffect } from 'react';

import AddNewContactMenu from '../../components/addNewContactMenu/AddNewContactMenu';
import ContactList from '../../components/contactList/ContactList';
import Pagination from '../../components/UI/pagination/Pagination';
import Search from '../../components/UI/search/Search';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';

import { GET_CONTACTS } from '../../store/sagas/sagasHelpers/variables';

import './contacts.scss';


const Contacts: FC = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch({ type: GET_CONTACTS });
  }, [dispatch]);

  return (
    <div className='contact-page'>
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
    </div>
  );
};


export default Contacts;
