import { FC, useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { ADD_NEW_CONTACT } from '../../store/sagas/sagasHelpers/variables';
import { fetchContactsSelector } from '../../store/slices/fetchContacts';
import NewDataForm, { NewData } from '../UI/NewDataForm';

import './addNewContactMenu.scss';


const AddNewContactMenu: FC = () => {
  const { totalPages, contacts } = useTypedSelector(fetchContactsSelector);

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
    totalPages < 8 && contacts.length !== 5 ? setAddition(true) : setALotOfPages(true);

    setTimeout(() => {
      setALotOfPages(false);
    }, 3000);
  };


  return (
    <div className='new-data'>
      {addition && (
        <div className='new-data-background' onClick={() => setAddition(false)}>
          <NewDataForm
            payloadType={ADD_NEW_CONTACT}
            setViewForm={setAddition}
            initialValues={initialValues}
          />
        </div>
      )}

      <div className='new-data__add'>
        <RiAddLine />
        <button onClick={() => onClickAddNewContact()}>Add new Contact</button>
      </div>

      {aLotOfPages && <p className='new-data__aLotOf-pages'>Too much pages</p>}
    </div>
  );
};


export default AddNewContactMenu;
