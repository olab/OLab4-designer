// @flow
import { all } from 'redux-saga/effects';

import authUserSaga from '../app/Login/sagas';
import edgeSaga from '../app/Modals/LinkEditor/sagas';
import templatesSaga from '../app/reducers/templates/sagas';
import mapSaga from '../app/reducers/map/sagas';
import nodeSaga from '../app/Constructor/Graph/Node/sagas';

export default function* rootSaga(): Generator<any, void, void> {
  yield all([
    authUserSaga(),
    edgeSaga(),
    templatesSaga(),
    mapSaga(),
    nodeSaga(),
  ]);
}
