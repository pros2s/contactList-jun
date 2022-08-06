import { FC, memo } from 'react';
import { IContact } from '../../types/contacts';


interface ContactItemProps {
  contact: IContact,
  deleteContact: (id: string) => void
}

const ContactItem: FC<ContactItemProps> = memo(({ contact, deleteContact }) => {
  return (
    <div style={{ display: 'flex' }} key={contact.id}>
      <img src={ contact.picture?.thumbnail } alt="contactAvatar" />
      <p>{`${contact.name?.first} ${contact.name?.last}`}</p>

      <button onClick={() => deleteContact(contact.id)} style={{ height: 30 }}>
        don't delete me, bruh
      </button>
    </div>
  );
});


export default ContactItem;
