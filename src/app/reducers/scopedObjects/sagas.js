import {
  call, put, select, takeLatest, takeEvery,
} from 'redux-saga/effects';
import {
  getScopedObjects, getScopedObjectDetails, createScopedObject,
} from '../../../services/api/scopedObjects';

import { GET_MAP_SUCCEEDED, CREATE_MAP_SUCCEEDED } from '../map/types';
import {
  SCOPED_OBJECTS_REQUESTED,
  SCOPED_OBJECT_DETAILS_REQUESTED,
  SCOPED_OBJECT_CREATE_REQUESTED,
} from './types';

import { ACTION_NOTIFICATION_ERROR } from '../notifications/action';
import {
  ACTION_SCOPED_OBJECTS_SUCCEEDED,
  ACTION_SCOPED_OBJECTS_FAILED,
  ACTION_SCOPED_OBJECT_DETAILS_FAILED,
  ACTION_SCOPED_OBJECT_DETAILS_SUCCEEDED,
  ACTION_SCOPED_OBJECT_CREATE_SUCCEEDED,
  ACTION_SCOPED_OBJECT_CREATE_FAILED,
} from './action';

function* getScopedObjectsSaga() {
  try {
    const mapId = yield select(({ map }) => map.id);
    const scopedObjects = yield call(getScopedObjects, mapId);

    yield put(ACTION_SCOPED_OBJECTS_SUCCEEDED(scopedObjects));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_SCOPED_OBJECTS_FAILED());
    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* getScopedObjectDetailsSaga({ scopedObjectId, scopedObjectType }) {
  try {
    const scopedObjectDetails = yield call(
      getScopedObjectDetails,
      scopedObjectId,
      scopedObjectType,
    );

    yield put(ACTION_SCOPED_OBJECT_DETAILS_SUCCEEDED(
      scopedObjectId,
      scopedObjectType,
      scopedObjectDetails,
    ));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_SCOPED_OBJECT_DETAILS_FAILED(scopedObjectId, scopedObjectType));
    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* createScopedObjectSaga({ scopedObjectType, scopedObjectData }) {
  try {
    const mapId = yield select(({ map }) => map.id);
    const scopedObjectId = yield call(
      createScopedObject,
      mapId,
      scopedObjectType,
      scopedObjectData,
    );

    yield put(ACTION_SCOPED_OBJECT_CREATE_SUCCEEDED(
      scopedObjectId,
      scopedObjectType,
      scopedObjectData,
    ));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_SCOPED_OBJECT_CREATE_FAILED());
    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* scopedObjectsSaga() {
  yield takeLatest(GET_MAP_SUCCEEDED, getScopedObjectsSaga);
  yield takeLatest(CREATE_MAP_SUCCEEDED, getScopedObjectsSaga);
  yield takeLatest(SCOPED_OBJECTS_REQUESTED, getScopedObjectsSaga);
  yield takeLatest(SCOPED_OBJECT_CREATE_REQUESTED, createScopedObjectSaga);
  yield takeEvery(SCOPED_OBJECT_DETAILS_REQUESTED, getScopedObjectDetailsSaga);
}

export default scopedObjectsSaga;
