import {
  call, put, select, takeLatest, takeEvery,
} from 'redux-saga/effects';
import { getScopedObjects, getScopedObjectDetails } from '../../../services/api/scopedObjects';

import { SCOPED_OBJECTS_REQUESTED, SCOPED_OBJECT_DETAILS_REQUESTED } from './types';
import { GET_MAP_SUCCEEDED, CREATE_MAP_SUCCEEDED } from '../map/types';

import { ACTION_NOTIFICATION_ERROR } from '../notifications/action';
import {
  ACTION_SCOPED_OBJECTS_SUCCEEDED,
  ACTION_SCOPED_OBJECTS_FAILED,
  ACTION_SCOPED_OBJECT_DETAILS_FAILED,
  ACTION_SCOPED_OBJECT_DETAILS_SUCCEEDED,
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

function* scopedObjectsSaga() {
  yield takeLatest(GET_MAP_SUCCEEDED, getScopedObjectsSaga);
  yield takeLatest(CREATE_MAP_SUCCEEDED, getScopedObjectsSaga);
  yield takeLatest(SCOPED_OBJECTS_REQUESTED, getScopedObjectsSaga);
  yield takeEvery(SCOPED_OBJECT_DETAILS_REQUESTED, getScopedObjectDetailsSaga);
}

export default scopedObjectsSaga;
