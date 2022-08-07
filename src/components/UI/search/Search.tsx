import { FC } from 'react';
import { RiSearch2Line } from 'react-icons/ri';

import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

import { searchDataSelector, setSearchValue } from '../../../store/slices/search';

import './search.scss';


const Search: FC = () => {
  const { searchData } = useTypedSelector(searchDataSelector);
  const dispatch = useTypedDispatch();


  return (
    <div className='search'>
      <input
        type='text'
        placeholder='search'
        value={searchData}
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
      />
      <RiSearch2Line />
    </div>
  );
};


export default Search;
