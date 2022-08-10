import { call, put, select, takeLatest, fork } from 'redux-saga/effects';

import {
  deletingContacts,
  endOfDeleteContact,
  failedDeletedContact,
} from '../slices/deleteContact';

import callAPI from './sagasHelpers/api';
import { DELETE_CONTACT, GET_CONTACTS } from './sagasHelpers/variables';


function* workerDeleteContact() {
  try {
    yield put(deletingContacts());
    const { deletedContactReducer } = yield select();
    yield call(() =>
      callAPI({
        url: `http://localhost:3001/data/${deletedContactReducer.deleteContactId}`,
        method: 'DELETE',
      }),
    );
    yield put(endOfDeleteContact());
    yield put({ type: GET_CONTACTS });
  } catch (e) {
    yield put(failedDeletedContact());
  }
}

function* watcherDeleteContact() {
  yield takeLatest(DELETE_CONTACT, workerDeleteContact);
}


export default function* deleteRoot() {
  yield fork(watcherDeleteContact);
}
