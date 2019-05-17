/* eslint-disable no-unused-vars */
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { updateEdge } from '../../../services/api/edge';

import { UPDATE_EDGE } from '../../reducers/map/types';

function* updateEdgeSaga(action) {
  try {
    const mapId = yield select(({ map }) => map.id);
    const data = yield call(updateEdge, mapId, action.edgeData);
    // yield put({ type: USER_AUTH_SUCCEEDED, token });
  } catch (error) {
    // const { response, message } = error;
    // const errorMessage = response ? response.data.message : message;

    console.log('error:::', error);

    // yield put({
    //   type: USER_AUTH_FAILED,
    //   errorMessage,
    // }); // TODO: handling of errors
  }
}

function* edgeSaga() {
  yield takeLatest(UPDATE_EDGE, updateEdgeSaga);
}

export default edgeSaga;
