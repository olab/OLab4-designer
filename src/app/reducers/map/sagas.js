import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { createMap } from '../../../services/api/map';

import { CREATE_MAP_REQUESTED } from './types';

import { ACTION_NOTIFICATION_ERROR } from '../notifications/action';
import { ACTION_CREATE_MAP_FAILED, ACTION_CREATE_MAP_SUCCEEDED } from './action';

function* createMapSaga(action) {
  try {
    const token = yield select(({ user }) => user.authData.token);
    const newMap = yield call(createMap, token, action.templateId);

    yield put(ACTION_CREATE_MAP_SUCCEEDED(newMap));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_CREATE_MAP_FAILED());
    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* mapSaga() {
  yield takeLatest(CREATE_MAP_REQUESTED, createMapSaga);
}

export default mapSaga;
