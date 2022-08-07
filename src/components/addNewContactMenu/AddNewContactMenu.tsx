import { FC, useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';

import { ADD_NEW_CONTACT } from '../../store/sagas/sagasHelpers/variables';
import NewDataForm, { NewData } from '../UI/NewDataForm';

import './addNewContactMenu.scss';


const AddNewContactMenu: FC = () => {
  const [addition, setAddition] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = addition ? 'hidden' : '';
  }, [addition]);


  const initialValues: NewData = {
    age: -1,
    email: '',
    firstName: '',
    lastName: '',
    location: '',
    phone: '',
  };


  return (
    <div>
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
        <button onClick={() => setAddition(true)}>Add new Contact</button>
      </div>
    </div>
  );
};


export default AddNewContactMenu;
