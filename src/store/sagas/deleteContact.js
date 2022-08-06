import { call, put, select, takeEvery } from "redux-saga/effects";

import { deletingContacts, failedDeletedContact } from "../slices/deleteContact";
import { succesDeletedContact } from "../slices/fetchContacts";

import callAPI from "./sagasHelpers/api";
import { DELETE_CONTACT } from "./sagasHelpers/variables";


export function* deleteContact() {
  try {
    yield put(deletingContacts());
    const { deletedContactReducer } = yield select();
    yield put(succesDeletedContact(deletedContactReducer.id));
    yield call(() => callAPI({ url: `http://localhost:3001/data/${deletedContactReducer.id}`, method: 'DELETE' }));
  } catch (e) {
    console.log(e)
    yield put(failedDeletedContact());
  }
}

export default function* deleteRoot() {
  yield takeEvery(DELETE_CONTACT, deleteContact);
}
