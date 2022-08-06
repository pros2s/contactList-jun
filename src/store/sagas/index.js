import { all, call, spawn,  } from 'redux-saga/effects';
import addRoot from './addContact';

import deleteRoot from './deleteContact';
import editRoot from './editContact';
import requestRoot from './pageLoader';


export default function* rootSaga() {
  const sagas = [requestRoot, deleteRoot, addRoot, editRoot];

  const repeatSagas = yield sagas.map((saga) => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log(e);
        }
      }
    });
  });

  yield all(repeatSagas);
}
