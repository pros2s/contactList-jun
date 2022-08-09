import { FC, useEffect } from 'react';

import AddNewContactMenu from '../../components/addNewContactMenu/AddNewContactMenu';
import ContactList from '../../components/contactList/ContactList';
import Error from '../../components/UI/errors/error/Error';
import Logout from '../../components/UI/logout/Logout';
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
    <div data-testid='contactsPage' className='contact-page'>
      {error ? (
        <Error message='Error with fetch contacts' />
      ) : (
        <div data-testid='contactsInner' className='contact-page__inner'>
          <header data-testid='contactsHeader'>
            <AddNewContactMenu />

            <div data-testid='contactsRightSideHeader' className='contact-page__rightHeader'>
              <Search />
              <Logout />
            </div>
          </header>
          <ContactList />
          <footer data-testid='contactsFooter'>
            <Pagination />
          </footer>
        </div>
      )}
    </div>
  );
};


export default Contacts;
