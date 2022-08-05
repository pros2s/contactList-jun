import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { failedContacts, fetchContacts, succesContacts } from '../slices/fetchContacts';
import { GET_CONTACTS } from './variables';

const callAPI = async ({ url, method, data }) => {
  return await axios({
    url,
    method,
    data
  });
};

export function* requestContacts() {
  try {
    yield put(fetchContacts());
    const response = yield call(() => callAPI({ url: 'http://localhost:3001/data', method: 'GET' }));
    yield put(succesContacts(response.data));
  } catch (e) {
    yield put(failedContacts());
  }
}

export default function* fetchAllContacts() {
  yield takeEvery(GET_CONTACTS, requestContacts);
}
