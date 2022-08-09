import { call, fork, put, select, takeEvery } from 'redux-saga/effects';

import {
  failedContacts,
  fetchContacts,
  setTotalContacts,
  succesContacts,
} from '../slices/fetchContacts';
import { GET_CONTACTS } from './sagasHelpers/variables';
import callAPI from './sagasHelpers/api';
import { AxiosResponse } from 'axios';


function* workerRequestContacts() {
  try {
    yield put(fetchContacts());
    const { fetchContactsReducer } = yield select();
    const response: AxiosResponse = yield call(() =>
      callAPI({
        url: `http://localhost:3001/data?_limit=5&_page=${fetchContactsReducer.currentPage}`,
        method: 'GET',
      }),
    );
    yield put(setTotalContacts(+response.headers['x-total-count']));
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
