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

  return (
    <div style={{ display: 'flex' }}>
      <img src={contact.picture?.thumbnail} alt='contactAvatar' />
      <p>{`${contact.name?.first} ${contact.name?.last}`}</p>

      <button onClick={() => deleteContact(contact.id)} style={{ height: 30 }}>
        don't delete me, bruh
      </button>

      {editing ? (
        <div>
          <NewDataForm contactId={contact.id} payloadType={EDIT_CONTACT} setViewForm={setEditing} />
        </div>
      ) : (
        <button onClick={() => setEditing(true)}>u gonna edit me?</button>
      )}
    </div>
  );
};


export default ContactItem;
