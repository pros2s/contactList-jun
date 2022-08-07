import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { IContact } from '../../types/contacts';


interface AddContactState {
  values: IContact;
  loading: boolean;
  error: string;
}

const initialState: AddContactState = {
  values: {
    email: '',
    name: {
      first: '',
      last: '',
    },
    id: '',
  },
  loading: false,
  error: '',
};

const addContactSlice = createSlice({
  name: 'addContact',
  initialState,
  reducers: {
    additingContactLoading(state) {
      state.loading = true;
    },
    setContactNewValues(state, { payload }: PayloadAction<IContact>) {
      state.values = payload;
      state.loading = false;
    },
    endOfAdditingContact(state) {
      state.loading = false;
    },
    additingError(state) {
      state.error = 'Error with additing contact';
      state.loading = false;
    },
    resetAdditinError(state) {
      state.error = '';
    },
  },
});

export const addedContactSelector = (state: RootState) => state.addContactReducer;
export const {
  additingError,
  setContactNewValues,
  resetAdditinError,
  additingContactLoading,
  endOfAdditingContact,
} = addContactSlice.actions;


export default addContactSlice.reducer;
