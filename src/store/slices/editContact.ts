import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NewContactValues } from "../../types/contacts"
import { RootState } from "../store"


interface EditContactState {
  editedData: NewContactValues | null
  loading: boolean
  id: string
  error: string
}

const initialState: EditContactState = {
  editedData: null,
  loading: false,
  id: '',
  error: ''
}

const editContactSlice = createSlice({
  name: 'editContact',
  initialState,
  reducers: {
    editingContacts(state) {
      state.loading = true
    },
    setEditedContactId(state, { payload }: PayloadAction<string>) {
      state.loading = false;
      state.error = '';
      state.id = payload
    },
    setEditedContactValues(state, { payload }: PayloadAction<NewContactValues>) {
      state.loading = false;
      state.error = '';
      state.editedData = payload
    },
    failedEditedContact(state) {
      state.error = 'Error with editing contact'
    }
  }
})

export const editedContactSelector = (state: RootState) => state.editContactReducer;
export const { editingContacts, failedEditedContact, setEditedContactId, setEditedContactValues } = editContactSlice.actions;


export default editContactSlice.reducer;
