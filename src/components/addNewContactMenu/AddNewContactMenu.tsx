import { FC, useState } from 'react';

import { ADD_NEW_CONTACT } from '../../store/sagas/sagasHelpers/variables';
import NewDataForm from '../UI/NewDataForm';


const AddNewContactMenu: FC = () => {
  const [addition, setAddition] = useState<boolean>(false);


  return (
    <div>
      {addition ? (
        <div>
          <NewDataForm payloadType={ADD_NEW_CONTACT} setViewForm={setAddition} formName='Add'/>
        </div>
      ) : (
        <button onClick={() => setAddition(true)}>Add new Contact</button>
      )}
    </div>
  );
};


export default AddNewContactMenu;
