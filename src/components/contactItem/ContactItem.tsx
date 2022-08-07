import { FC, memo, useState } from 'react';

import { EDIT_CONTACT } from '../../store/sagas/sagasHelpers/variables';

import { IContact } from '../../types/contacts';
import NewDataForm, { NewData } from '../UI/NewDataForm';

import '../addNewContactMenu/addNewContactMenu.scss';

import './contactItem.scss';


interface ContactItemProps {
  contact: IContact;
  deleteContact: (id: string) => void;
}

const ContactItem: FC<ContactItemProps> = memo(({ contact, deleteContact }) => {
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
    <div className='contact'>
      <div className='contact__data'>
        <img className='contact__data-img' src={picture?.large} alt='contactAvatar' />
        <div className='contact__data-info'>
          <h3>{`${contactTitle} ${name?.first} ${name?.last}`}</h3>
          <p>email: {email}</p>
          <p>address: {location}</p>
          <p>phone number: {phone}</p>
          <p>age: {age && age > 0 && age}</p>
        </div>
      </div>

      <div className='contact__crud'>
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
          <button className='contact__crud-edit' onClick={() => setEditing(true)}>
            edit
          </button>
        )}

        <button
          className='contact__crud-delete'
          onClick={() => deleteContact(id)}
          style={{ height: 30 }}>
          delete
        </button>
      </div>
    </div>
  );
});


export default ContactItem;
