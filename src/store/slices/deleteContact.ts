import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"


interface DeleteContactState {
  deleteContactLoading: boolean
  deleteContactId: string
  deleteContactError: string
}

const initialState: DeleteContactState = {
  deleteContactLoading: false,
  deleteContactId: '',
  deleteContactError: ''
}

const deleteContactSlice = createSlice({
  name: 'deleteContact',
  initialState,
  reducers: {
    deletingContacts(state) {
      state.deleteContactLoading = true
    },
    setDeletedContactId(state, { payload }: PayloadAction<string>) {
      state.deleteContactLoading = false;
      state.deleteContactError = '';
      state.deleteContactId = payload
    },
    failedDeletedContact(state) {
      state.deleteContactError = 'Error with deleting contact';
      state.deleteContactLoading = false;
    },
    resetDeleteError(state) {
      state.deleteContactError = '';
    },
    endOfDeleteContact(state) {
      state.deleteContactLoading = false;
    },
  }
})

export const deletedContactSelector = (state: RootState) => state.deletedContactReducer;
export const { deletingContacts, failedDeletedContact, setDeletedContactId, resetDeleteError, endOfDeleteContact } = deleteContactSlice.actions;


export default deleteContactSlice.reducer;
