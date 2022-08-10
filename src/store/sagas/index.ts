import { all, spawn,  } from 'redux-saga/effects';
import addRoot from './addContact';

import deleteRoot from './deleteContact';
import editRoot from './editContact';
import requestRoot from './pageLoader';


export default function* rootSaga() {
  yield all([
    spawn(requestRoot),
    spawn(deleteRoot),
    spawn(addRoot),
    spawn(editRoot)
  ]);
}
