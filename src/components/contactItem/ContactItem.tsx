import { FC, useState } from 'react';

import { EDIT_CONTACT } from '../../store/sagas/sagasHelpers/variables';

import { IContact } from '../../types/contacts';
import NewDataForm from '../UI/NewDataForm';


interface ContactItemProps {
  contact: IContact;
  deleteContact: (id: string) => void;
}

const ContactItem: FC<ContactItemProps> = ({ contact, deleteContact }) => {
  const [editing, setEditing] = useState<boolean>(false);

  const contactTitle = contact.name.title ? `${contact.name.title}.` : '';

  return (
    <div style={{ display: 'flex' }}>
      <img src={contact.picture?.thumbnail} alt='contactAvatar' />
      <div>
        <p>{`${ contactTitle } ${contact.name?.first} ${contact.name?.last}`}</p>
        <p>email: {contact.email}</p>
        <p>address: {contact.location}</p>
        <p>phone number: {contact.phone}</p>
        <p>age: {contact.age}</p>
      </div>

      <button onClick={() => deleteContact(contact.id)} style={{ height: 30 }}>
        don't delete me, bruh
      </button>

      {editing ? (
        <div>
          <NewDataForm contactId={contact.id} payloadType={EDIT_CONTACT} setViewForm={setEditing} formName='Edit'/>
        </div>
      ) : (
        <button onClick={() => setEditing(true)}>u gonna edit me?</button>
      )}
    </div>
  );
};


export default ContactItem;
