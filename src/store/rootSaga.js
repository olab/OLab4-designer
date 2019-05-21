// @flow
import { all } from 'redux-saga/effects';

import authUserSaga from '../app/Login/sagas';
import edgeSaga from '../app/Modals/LinkEditor/sagas';
import templatesSaga from '../app/reducers/templates/sagas';

export default function* rootSaga(): Generator<any, void, void> {
  yield all([
    authUserSaga(),
    edgeSaga(),
    templatesSaga(),
  ]);
}
