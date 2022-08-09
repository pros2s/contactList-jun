import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { additingContactLoading, additingError, endOfAdditingContact } from '../slices/addContact';

import callAPI from './sagasHelpers/api';
import { ADD_NEW_CONTACT, GET_CONTACTS } from './sagasHelpers/variables';


function* workerAddContact() {
  try {
    yield put(additingContactLoading());
    const { addContactReducer } = yield select();
    yield call(() =>
      callAPI({
        url: `http://localhost:3001/data`,
        method: 'POST',
        data: addContactReducer.values,
      }),
    );
    yield put(endOfAdditingContact());
    yield put({ type: GET_CONTACTS });
  } catch (e) {
    yield put(additingError());
  }
}

function* watcherAddContact() {
  yield takeLatest(ADD_NEW_CONTACT, workerAddContact);
}


export default function* addRoot() {
  yield fork(watcherAddContact);
}
