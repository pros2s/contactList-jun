import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


interface SearchData {
  searchData: string;
}

const initialState: SearchData = {
  searchData: '',
};

const searchDataSlice = createSlice({
  name: 'searchData',
  initialState,
  reducers: {
    setSearchValue(state, { payload }: PayloadAction<string>) {
      state.searchData = payload;
    },
  },
});

export const searchDataSelector = (state: RootState) => state.searchDataReducer;
export const { setSearchValue } = searchDataSlice.actions;


export default searchDataSlice.reducer;
