import { FC, useEffect, useState } from 'react';
import { RiAddLine, RiCloseLine } from 'react-icons/ri';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { ADD_NEW_CONTACT } from '../../store/sagas/sagasHelpers/variables';
import { addedContactSelector, resetAdditingError } from '../../store/slices/addContact';
import { fetchContactsSelector } from '../../store/slices/fetchContacts';
import ErrorMini from '../UI/errors/errorMini/ErrorMini';
import Loader from '../UI/loader/Loader';
import NewDataForm from '../UI/newDataForm/NewDataForm';

import { NewData } from '../../types/newData';

import './addNewContactMenu.scss';


const AddNewContactMenu: FC = () => {
  const dispatch = useTypedDispatch();

  const { currentPage, contacts, totalPages } = useTypedSelector(fetchContactsSelector);
  const { error, loading } = useTypedSelector(addedContactSelector);

  const [addition, setAddition] = useState<boolean>(false);
  const [aLotOfPages, setALotOfPages] = useState<boolean>(false);
  const [aLotOfContacts, setALotOfContacts] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = addition ? 'hidden' : '';
  }, [addition]);

  useEffect(() => {
    const additionErrorTimeout = setTimeout(() => {
      setALotOfPages(false);
      setALotOfContacts(false);
    }, 3000);

    return () => clearTimeout(additionErrorTimeout);
  }, [aLotOfPages, aLotOfContacts]);


  const initialValues: NewData = {
    age: 0,
    email: '',
    firstName: '',
    lastName: '',
    location: '',
    phone: '',
  };

  const onClickAddNewContact = () => {
    if (currentPage === '7' && contacts.length === 5) {
      setALotOfPages(true);
    } else if (currentPage < totalPages.toString() && contacts.length === 5) {
      setALotOfContacts(true);
    } else {
      setAddition(true);
    }
  };


  return (
    <>
      <div
        data-testid='addNewContact'
        data-text='add new contact'
        className='new-data'>
          {loading ? (
            <Loader width='20' info='Loading add contact' />
          ) : (
            <button
              data-testid='addNewContactButton'
              className='new-data__add'
              onClick={() => onClickAddNewContact()}>
                <RiAddLine />
                <p>Add new Contact</p>

                {aLotOfPages && <p className='new-data__addition-error'>Too much pages</p>}
                {!aLotOfPages && aLotOfContacts && <p className='new-data__addition-error'>Too much contacts on this page</p>}
            </button>
          )}

          {error && <ErrorMini message='Error with additing new contact' />}
          {error && <RiCloseLine onClick={() => dispatch(resetAdditingError())} />}
      </div>

      {addition && (
        <div data-testid='additionalForm' className='new-data-background' onClick={() => setAddition(false)}>
          <NewDataForm
            payloadType={ADD_NEW_CONTACT}
            setViewForm={setAddition}
            initialValues={initialValues}
          />
        </div>
      )}
    </>
  );
};


export default AddNewContactMenu;
