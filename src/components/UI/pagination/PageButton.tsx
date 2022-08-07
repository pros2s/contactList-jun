import { FC, memo, useEffect, useRef } from 'react';
import { Params, useNavigate, useParams } from 'react-router-dom';

import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { GET_CONTACTS } from '../../../store/sagas/sagasHelpers/variables';
import { setCurrentPage } from '../../../store/slices/fetchContacts';


interface PageButtonProps {
  page: Number;
  index: number;
  arrLength: number;
}

const PageButton: FC<PageButtonProps> = memo(({ page, arrLength, index }) => {
  const dispatch = useTypedDispatch();
  const pageRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  const { id }: Params<string> = useParams();

  useEffect(() => {
    id && dispatch(setCurrentPage(id));
  }, [id, dispatch]);


  const revertedPage = +page - arrLength + (2 * index + 1);
  const onClickPage = (page: string) => {
    navigate(`/contacts/${revertedPage}`);
    dispatch(setCurrentPage(page));
    dispatch({ type: GET_CONTACTS });
  };


  return (
    <button
      ref={pageRef}
      className={`${
        revertedPage.toString() === id ? 'pagination__elem active' : 'pagination__elem'
      }`}
      onClick={() => onClickPage(page.toString())}>
        {revertedPage}
    </button>
  );
});


export default PageButton;
