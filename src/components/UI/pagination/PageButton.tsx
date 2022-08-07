import { FC, memo } from 'react';
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

  const navigate = useNavigate();
  const { id }: Params<string> = useParams();


  const revertedPage = +page - arrLength + (2 * index + 1);
  const onClickPage = (page: string) => {
    navigate(`/contacts/${revertedPage}`);
    dispatch(setCurrentPage(page));
    dispatch({ type: GET_CONTACTS });
  };


  return (
    <button
      className={`${
        revertedPage.toString() === id ? 'pagination__elem active' : 'pagination__elem'
      }`}
      onClick={() => onClickPage(page.toString())}>
      {revertedPage}
    </button>
  );
});


export default PageButton;
