import { FC, useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { ADD_NEW_CONTACT } from '../../store/sagas/sagasHelpers/variables';
import { fetchContactsSelector } from '../../store/slices/fetchContacts';
import NewDataForm, { NewData } from '../UI/NewDataForm';

import './addNewContactMenu.scss';


const AddNewContactMenu: FC = () => {
  const { totalPages } = useTypedSelector(fetchContactsSelector);

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
      <button data-testid='addNewContact' className='new-data' onClick={() => onClickAddNewContact()}>
        <RiAddLine />
        <button>Add new Contact</button>
        {aLotOfPages && <p className='new-data__aLotOf-pages'>Too much pages</p>}
      </button>

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
