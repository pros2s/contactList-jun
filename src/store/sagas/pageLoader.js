import { call, fork, put, takeEvery } from 'redux-saga/effects';

import { failedContacts, fetchContacts, succesContacts } from '../slices/fetchContacts';
import { GET_CONTACTS } from './sagasHelpers/variables';
import callAPI from './sagasHelpers/api';


function* workerRequestContacts() {
  try {
    yield put(fetchContacts());
    const response = yield call(() =>
      callAPI({ url: 'http://localhost:3001/data', method: 'GET' }),
    );
    const copyData = response.data;
    yield put(succesContacts(copyData.reverse()));
  } catch (e) {
    yield put(failedContacts());
  }
}

function* watcherRequestContacts() {
  yield takeEvery(GET_CONTACTS, workerRequestContacts);
}


export default function* requestRoot() {
  yield fork(watcherRequestContacts);
}
