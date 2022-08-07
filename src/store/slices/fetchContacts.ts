import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContact } from '../../types/contacts';
import { RootState } from '../store';


interface FetchContactsState {
  contacts: IContact[];
  totalContacts: number | null;
  totalPages: number;
  currentPage: string;
  loading: boolean;
  error: string;
}

const initialState: FetchContactsState = {
  contacts: [],
  totalContacts: null,
  totalPages: 0,
  currentPage: '',
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
    },
    setTotalContacts(state, { payload }: PayloadAction<number>) {
      state.totalContacts = payload;
    },
    setCurrentPage(state, { payload }: PayloadAction<string>) {
      state.currentPage = payload;
    },
    setTotalPages(state, { payload }: PayloadAction<number>) {
      state.totalPages = payload;
    },
  },
});

export const fetchContactsSelector = (state: RootState) => state.fetchContactsReducer;
export const {
  failedContacts,
  fetchContacts,
  succesContacts,
  succesDeletedContact,
  setTotalContacts,
  setCurrentPage,
  setTotalPages,
} = fetchContactsSlice.actions;


export default fetchContactsSlice.reducer;
