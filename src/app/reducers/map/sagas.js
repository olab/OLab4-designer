import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { getMap, createMap, extendMap } from '../../../services/api/map';

import {
  GET_MAP_REQUESTED,
  CREATE_MAP_REQUESTED,
  EXTEND_MAP_REQUESTED,
} from './types';

import { ACTION_NOTIFICATION_ERROR } from '../notifications/action';
import {
  ACTION_GET_MAP_FAILED,
  ACTION_GET_MAP_SUCCEEDED,
  ACTION_CREATE_MAP_FAILED,
  ACTION_CREATE_MAP_SUCCEEDED,
  ACTION_EXTEND_MAP_FAILED,
  ACTION_EXTEND_MAP_SUCCEEDED,
} from './action';

function* getMapSaga({ mapId }) {
  try {
    const map = yield call(getMap, mapId);

    yield put(ACTION_GET_MAP_SUCCEEDED(map));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_GET_MAP_FAILED());
    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* createMapSaga({ templateId }) {
  try {
    const newMap = yield call(createMap, templateId);

    yield put(ACTION_CREATE_MAP_SUCCEEDED(newMap));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_CREATE_MAP_FAILED());
    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* extendMapSaga({ templateId }) {
  try {
    const mapId = yield select(({ map }) => map.id);
    const { extendedNodes, extendedEdges } = yield call(extendMap, mapId, templateId);

    yield put(ACTION_EXTEND_MAP_SUCCEEDED(extendedNodes, extendedEdges));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_EXTEND_MAP_FAILED());
    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* mapSaga() {
  yield takeLatest(GET_MAP_REQUESTED, getMapSaga);
  yield takeLatest(CREATE_MAP_REQUESTED, createMapSaga);
  yield takeLatest(EXTEND_MAP_REQUESTED, extendMapSaga);
}

export default mapSaga;
