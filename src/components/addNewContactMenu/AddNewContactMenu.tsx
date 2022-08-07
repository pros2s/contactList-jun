import { FC, useEffect, useState } from 'react';
import { RiAddLine, RiCloseLine } from 'react-icons/ri';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { ADD_NEW_CONTACT } from '../../store/sagas/sagasHelpers/variables';
import { addedContactSelector, resetAdditinError } from '../../store/slices/addContact';
import { fetchContactsSelector } from '../../store/slices/fetchContacts';
import ErrorMini from '../UI/errors/errorMini/ErrorMini';
import Loader from '../UI/loader/Loader';
import NewDataForm, { NewData } from '../UI/NewDataForm';

import './addNewContactMenu.scss';


const AddNewContactMenu: FC = () => {
  const dispatch = useTypedDispatch();

  const { totalPages } = useTypedSelector(fetchContactsSelector);
  const { error, loading } = useTypedSelector(addedContactSelector);

  const [addition, setAddition] = useState<boolean>(false);
  const [aLotOfPages, setALotOfPages] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = addition ? 'hidden' : '';
  }, [addition]);


  const initialValues: NewData = {
    age: 0,
    email: '',
    firstName: '',
    lastName: '',
    location: '',
    phone: '',
  };

  const onClickAddNewContact = () => {
    totalPages < 7 ? setAddition(true) : setALotOfPages(true);

    setTimeout(() => {
      setALotOfPages(false);
    }, 3000);
  };


  return (
    <>
      <div className='new-data'>
        {loading ? (
          <Loader width='20' info='Loading add contact' />
        ) : (
          <button
            data-testid='addNewContact'
            className='new-data__add'
            onClick={() => onClickAddNewContact()}>
            <RiAddLine />
            <p>Add new Contact</p>
            {aLotOfPages && <p className='new-data__aLotOf-pages'>Too much pages</p>}
          </button>
        )}

        {error && <ErrorMini message='Error with additing new contact' />}
        {error && <RiCloseLine onClick={() => dispatch(resetAdditinError())} />}
      </div>

      {addition && (
        <div className='new-data-background' onClick={() => setAddition(false)}>
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
