import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContact } from '../../types/contacts';
import { RootState } from '../store';


interface EditContactState {
  editedData: IContact | null;
  loading: boolean;
  editedId: string;
  error: string;
}

const initialState: EditContactState = {
  editedData: null,
  loading: false,
  editedId: '',
  error: '',
};

const editContactSlice = createSlice({
  name: 'editContact',
  initialState,
  reducers: {
    editingContacts(state) {
      state.loading = true;
    },
    setEditedContactId(state, { payload }: PayloadAction<string>) {
      state.editedId = payload;
    },
    setEditedContactValues(state, { payload }: PayloadAction<IContact>) {
      state.loading = false;
      state.error = '';
      state.editedData = payload;
    },
    endOfEditingContact(state) {
      state.loading = false;
    },
    failedEditedContact(state) {
      state.error = 'Error with editing contact';
      state.loading = false;
    },
    resetError(state) {
      state.error = '';
    },
  },
});

export const editedContactSelector = (state: RootState) => state.editContactReducer;
export const {
  editingContacts,
  failedEditedContact,
  setEditedContactId,
  setEditedContactValues,
  resetError
} = editContactSlice.actions;


export default editContactSlice.reducer;
