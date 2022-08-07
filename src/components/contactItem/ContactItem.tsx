import { FC, useState } from 'react';

import { EDIT_CONTACT } from '../../store/sagas/sagasHelpers/variables';

import { IContact } from '../../types/contacts';
import NewDataForm, { NewData } from '../UI/NewDataForm';

import '../addNewContactMenu/addNewContactMenu.scss';


interface ContactItemProps {
  contact: IContact;
  deleteContact: (id: string) => void;
}

const ContactItem: FC<ContactItemProps> = ({ contact, deleteContact }) => {
  const [editing, setEditing] = useState<boolean>(false);


  const { email, id, name, age, location, phone, picture } = contact;

  const contactTitle = name.title ? `${name.title}.` : '';

  const initialValues: NewData = {
    age,
    email,
    firstName: name.first,
    lastName: name.last,
    location,
    phone,
  };


  return (
    <div style={{ display: 'flex' }}>
      <img src={picture?.thumbnail} alt='contactAvatar' />
      <div>
        <p>{`${contactTitle} ${name?.first} ${name?.last}`}</p>
        <p>email: {email}</p>
        <p>address: {location}</p>
        <p>phone number: {phone}</p>
        <p>age: {age && age > 0 && age}</p>
      </div>

      <button onClick={() => deleteContact(id)} style={{ height: 30 }}>
        don't delete me, bruh
      </button>

      {editing ? (
        <div className='new-data-background' onClick={() => setEditing(false)}>
          <NewDataForm
            contactId={id}
            payloadType={EDIT_CONTACT}
            setViewForm={setEditing}
            initialValues={initialValues}
          />
        </div>
      ) : (
        <button onClick={() => setEditing(true)}>u gonna edit me?</button>
      )}
    </div>
  );
};


export default ContactItem;
