import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface DeleteContactState {
  loading: boolean
  id: string
  error: string
}

const initialState: DeleteContactState = {
  loading: false,
  id: '',
  error: ''
}

const deleteContactSlice = createSlice({
  name: 'deleteContact',
  initialState,
  reducers: {
    deletingContacts(state) {
      state.loading = true
    },
    setDeletedContactId(state, { payload }: PayloadAction<string>) {
      state.loading = false;
      state.error = '';
      state.id = payload
    },
    failedDeletedContact(state) {
      state.error = 'Error with deleting contact'
    }
  }
})

export const deletedContactSelector = (state: RootState) => state.deletedContactReducer;
export const { deletingContacts, failedDeletedContact, setDeletedContactId } = deleteContactSlice.actions;


export default deleteContactSlice.reducer;
