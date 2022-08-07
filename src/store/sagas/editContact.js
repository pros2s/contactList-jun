import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { editingContacts, endOfEditingContact, failedEditedContact } from '../slices/editContact';

import callAPI from './sagasHelpers/api';
import { EDIT_CONTACT, GET_CONTACTS } from './sagasHelpers/variables';


function* workerEditContact() {
  try {
    yield put(editingContacts());
    const { editContactReducer } = yield select();
    yield call(() =>
      callAPI({
        url: `http://localhost:3001/data/${editContactReducer.editedId}`,
        method: 'PATCH',
        data: editContactReducer.editedData,
      }),
    );
    yield put(endOfEditingContact());
    yield put({ type: GET_CONTACTS });
  } catch (e) {
    console.log(e);
    yield put(failedEditedContact());
  }
}

function* watcherEditContact() {
  yield takeEvery(EDIT_CONTACT, workerEditContact);
}


export default function* editRoot() {
  yield fork(watcherEditContact);
}
