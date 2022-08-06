import { call, put, takeEvery } from 'redux-saga/effects';

import { failedContacts, fetchContacts, succesContacts } from '../slices/fetchContacts';
import { GET_CONTACTS } from './sagasHelpers/variables';
import callAPI from './sagasHelpers/api';


export function* requestContacts() {
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

export default function* requestRoot() {
  yield takeEvery(GET_CONTACTS, requestContacts);
}
