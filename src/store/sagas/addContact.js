import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { additingContact, additingError } from '../slices/addContact';

import callAPI from './sagasHelpers/api';
import { ADD_NEW_CONTACT } from './sagasHelpers/variables';


function* workerAddContact() {
  try {
    yield put(additingContact());
    const { addContactReducer } = yield select();
    yield call(() =>
      callAPI({
        url: `http://localhost:3001/data`,
        method: 'POST',
        data: addContactReducer.values,
      }),
    );
  } catch (e) {
    console.log(e);
    yield put(additingError());
  }
}

function* watcherAddContact() {
  yield takeLatest(ADD_NEW_CONTACT, workerAddContact);
}

export default function* addRoot() {
  yield fork(watcherAddContact);
}
