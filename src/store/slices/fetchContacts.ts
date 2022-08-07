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
    succesDeletedContact(state, { payload }: PayloadAction<string>) {
      state.contacts = state.contacts.filter((contact) => contact.id !== payload);
    }
  },
});

export const fetchContactsSelector = (state: RootState) => state.fetchContactsReducer;
export const { failedContacts, fetchContacts, succesContacts, succesDeletedContact } = fetchContactsSlice.actions;


export default fetchContactsSlice.reducer;
