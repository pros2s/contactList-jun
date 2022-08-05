import { all, call, spawn,  } from 'redux-saga/effects';
import fetchAllContacts from './pageLoader';


export default function* rootSaga() {
  const sagas = [fetchAllContacts];

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
