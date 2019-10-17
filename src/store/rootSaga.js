// @flow
import { all } from 'redux-saga/effects';

import authUserSaga from '../app/Login/sagas';
import edgeSaga from '../app/Constructor/Graph/Edge/sagas';
import nodeSaga from '../app/Constructor/Graph/Node/sagas';
import mapSaga from '../app/reducers/map/sagas';
import mapDetailsSaga from '../app/reducers/mapDetails/sagas';
import defaultsSaga from '../app/reducers/defaults/sagas';
import templatesSaga from '../app/reducers/templates/sagas';
import scopedObjectsSaga from '../app/reducers/scopedObjects/sagas';
import scopeLevelsSaga from '../app/reducers/scopeLevels/sagas';
import counterGridSaga from '../app/reducers/counterGrid/sagas';

export default function* rootSaga(): Generator<any, void, void> {
  yield all([
    authUserSaga(),
    edgeSaga(),
    nodeSaga(),
    mapSaga(),
    mapDetailsSaga(),
    defaultsSaga(),
    templatesSaga(),
    scopedObjectsSaga(),
    scopeLevelsSaga(),
    counterGridSaga(),
  ]);
}
