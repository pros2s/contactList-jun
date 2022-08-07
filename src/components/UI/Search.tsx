import { FC } from 'react';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { searchDataSelector, setSearchValue } from '../../store/slices/search';


const Search: FC = () => {
  const { searchData } = useTypedSelector(searchDataSelector);
  const dispatch = useTypedDispatch();

  
  return (
    <div>
      <input
        type='text'
        value={searchData}
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
      />
    </div>
  );
};


export default Search;
