import { call, put, select, takeLatest, fork } from "redux-saga/effects";

import { deletingContacts, failedDeletedContact } from "../slices/deleteContact";
import { succesDeletedContact } from "../slices/fetchContacts";

import callAPI from "./sagasHelpers/api";
import { DELETE_CONTACT, GET_CONTACTS } from "./sagasHelpers/variables";


export function* workerDeleteContact() {
  try {
    yield put(deletingContacts());
    const { deletedContactReducer } = yield select();
    yield put(succesDeletedContact(deletedContactReducer.id));
    yield call(() => callAPI({ url: `http://localhost:3001/data/${deletedContactReducer.id}`, method: 'DELETE' }));
    yield put({ type: GET_CONTACTS });
  } catch (e) {
    console.log(e)
    yield put(failedDeletedContact());
  }
}

export function* watcherDeleteContact() {
  yield takeLatest(DELETE_CONTACT, workerDeleteContact);
}


export default function* deleteRoot() {
  yield fork(watcherDeleteContact);
}
