import { call, put, select, takeEvery } from "redux-saga/effects";
import { additingContact, additingError } from "../slices/addContact";

import callAPI from "./sagasHelpers/api";
import { ADD_NEW_CONTACT } from "./sagasHelpers/variables";


export function* addContact() {
  try {
    yield put(additingContact());
    const { addContactReducer } = yield select();
    yield call(() => callAPI({ url: `http://localhost:3001/data`, method: 'POST', data: addContactReducer.values }));
  } catch (e) {
    console.log(e)
    yield put(additingError());
  }
}

export default function* addRoot() {
  yield takeEvery(ADD_NEW_CONTACT, addContact);
}
