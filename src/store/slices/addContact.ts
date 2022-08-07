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
    additingContact(state) {
      state.loading = true;
    },
    setContactNewValues(state, { payload }: PayloadAction<IContact>) {
      state.loading = false;
      state.values = payload;
    },
    additingError(state) {
      state.error = 'Error with additing contact';
    },
  },
});

export const deletedContactSelector = (state: RootState) => state.addContactReducer;
export const { additingContact, additingError, setContactNewValues } = addContactSlice.actions;


export default addContactSlice.reducer;
