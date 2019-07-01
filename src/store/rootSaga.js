// @flow
import { all } from 'redux-saga/effects';

import authUserSaga from '../app/Login/sagas';
import edgeSaga from '../app/Constructor/Graph/Edge/sagas';
import nodeSaga from '../app/Constructor/Graph/Node/sagas';
import mapSaga from '../app/reducers/map/sagas';
import defaultsSaga from '../app/reducers/defaults/sagas';
import templatesSaga from '../app/reducers/templates/sagas';

export default function* rootSaga(): Generator<any, void, void> {
  yield all([
    authUserSaga(),
    edgeSaga(),
    nodeSaga(),
    mapSaga(),
    defaultsSaga(),
    templatesSaga(),
  ]);
}
