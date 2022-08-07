import { FC, useEffect } from 'react';
import { nanoid } from '@reduxjs/toolkit';

import { usePagesArray } from '../../../hooks/usePagesArray';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import {
  fetchContactsSelector,
  setCurrentPage,
  setTotalPages,
} from '../../../store/slices/fetchContacts';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';

import PageButton from './PageButton';

import './pagination.scss';


const Pagination: FC = () => {
  const dispatch = useTypedDispatch();
  const { totalContacts, contacts, totalPages } = useTypedSelector(fetchContactsSelector);

  const pagesList = usePagesArray(totalPages);

  useEffect(() => {
    totalContacts && dispatch(setTotalPages(Math.ceil(totalContacts / 5)));
  }, [totalContacts, dispatch]);

  useEffect(() => {
    !contacts.length && dispatch(setCurrentPage(`${totalPages - 1}`));
  }, [dispatch, contacts, totalPages]);


  return (
    <ul className='pagination'>
      {pagesList.reverse().map((page, index, arr) => (
        <li key={nanoid()}>
          <PageButton page={page} index={index} arrLength={arr.length} />
        </li>
      ))}
    </ul>
  );
};


export default Pagination;
