import { FC, memo, useEffect, useState } from 'react';

import { EDIT_CONTACT } from '../../store/sagas/sagasHelpers/variables';

import { IContact } from '../../types/contacts';
import NewDataForm, { NewData } from '../UI/NewDataForm';

import '../addNewContactMenu/addNewContactMenu.scss';

import './contactItem.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { editedContactSelector, resetEditingError } from '../../store/slices/editContact';
import Loader from '../UI/loader/Loader';
import ErrorMini from '../UI/errors/errorMini/ErrorMini';
import { RiCloseLine } from 'react-icons/ri';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { deletedContactSelector, resetDeleteError } from '../../store/slices/deleteContact';


interface ContactItemProps {
  contact: IContact;
  deleteContact: (id: string) => void;
}

const ContactItem: FC<ContactItemProps> = memo(({ contact, deleteContact }) => {
  const dispatch = useTypedDispatch();
  const { loading, error, editedId } = useTypedSelector(editedContactSelector);
  const { deleteContactError, deleteContactLoading, deleteContactId } =
    useTypedSelector(deletedContactSelector);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = editing ? 'hidden' : '';
  }, [editing]);


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
    <>
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
          {loading ? (
            <Loader width='20' info='Loading edit contact' />
          ) : error && id === editedId ? (
            <ErrorMini message='Error with edit contact' />
          ) : (
            <button className='contact__crud-edit' onClick={() => setEditing(true)}>
              edit
            </button>
          )}
          {error && id === editedId && (
            <RiCloseLine onClick={() => dispatch(resetEditingError())} />
          )}

          {deleteContactLoading ? (
            <Loader width='20' info='Loading delete contact' />
          ) : deleteContactError && id === deleteContactId ? (
            <ErrorMini message='Error with delete contact' />
          ) : (
            <button
              className='contact__crud-delete'
              onClick={() => deleteContact(id)}
              style={{ height: 30 }}>
              delete
            </button>
          )}
          {deleteContactError && id === deleteContactId && (
            <RiCloseLine onClick={() => dispatch(resetDeleteError())} />
          )}
        </div>
      </div>

      {editing && (
        <div className='new-data-background' onClick={() => setEditing(false)}>
          <NewDataForm
            contactId={id}
            payloadType={EDIT_CONTACT}
            setViewForm={setEditing}
            initialValues={initialValues}
          />
        </div>
      )}
    </>
  );
});


export default ContactItem;
