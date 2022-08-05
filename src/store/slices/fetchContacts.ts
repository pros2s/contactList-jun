import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContact } from '../../types/contacts';
import { RootState } from '../store';

interface FetchContactsState {
  contacts: IContact[];
  loading: boolean;
  error: string;
}

const initialState: FetchContactsState = {
  contacts: [],
  loading: false,
  error: '',
};

const fetchContactsSlice = createSlice({
  name: 'fetchContacts',
  initialState,
  reducers: {
    fetchContacts(state) {
      state.loading = true;
    },
    succesContacts(state, { payload }: PayloadAction<IContact[]>) {
      state.loading = false;
      state.error = '';
      state.contacts = payload;
    },
    failedContacts(state) {
      state.loading = false;
      state.error = 'Error with fetch contacts';
    },
  },
});

export const fetchContactsSelector = (state: RootState) => state.fetchContactsReducer;
export const { failedContacts, fetchContacts, succesContacts } = fetchContactsSlice.actions;


export default fetchContactsSlice.reducer;
