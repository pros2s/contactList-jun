import { FC, memo, useEffect, useState } from 'react';
import { RiCloseLine, RiDeleteBin4Fill, RiEdit2Fill } from 'react-icons/ri';

import { EDIT_CONTACT } from '../../store/sagas/sagasHelpers/variables';
import { IContact, NewData } from '../../types/contacts';

import NewDataForm from '../UI/NewDataForm';
import ErrorMini from '../UI/errors/errorMini/ErrorMini';
import Loader from '../UI/loader/Loader';

import { deletedContactSelector, resetDeleteError } from '../../store/slices/deleteContact';
import { editedContactSelector, resetEditingError } from '../../store/slices/editContact';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';

import '../addNewContactMenu/addNewContactMenu.scss';
import './contactItem.scss';


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
            <div
              data-text='edit'
              className="contact__crud-edit">
                <RiEdit2Fill onClick={() => setEditing(true)} />
            </div>
          )}
          {error && id === editedId && (
            <RiCloseLine onClick={() => dispatch(resetEditingError())} />
          )}

          {deleteContactLoading && id === deleteContactId ? (
            <Loader width='20' info='Loading delete contact' />
          ) : deleteContactError && id === deleteContactId ? (
            <ErrorMini message='Error with delete contact' />
          ) : (
            <div
              data-text='delete'
              className="contact__crud-delete">
                <RiDeleteBin4Fill onClick={() => deleteContact(id)} />
            </div>
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
