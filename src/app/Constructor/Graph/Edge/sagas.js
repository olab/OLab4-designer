import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';

import {
  createEdge, deleteEdge, updateEdge,
} from '../../../../services/api/edge';

import { ACTION_EXCHANGE_EDGE_ID } from '../../../reducers/map/action';
import { ACTION_NOTIFICATION_ERROR } from '../../../reducers/notifications/action';

import {
  CREATE_EDGE,
  DELETE_EDGE,
  UPDATE_EDGE,
} from '../../../reducers/map/types';

function* createEdgeSaga({ edgeData }) {
  try {
    const { data: { id: prevEdgeId } } = edgeData;
    const mapId = yield select(({ map }) => map.id);

    const newEdgeId = yield call(createEdge, mapId, edgeData.data);

    yield put(ACTION_EXCHANGE_EDGE_ID(prevEdgeId, newEdgeId));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* deleteEdgeSaga({ edgeId, nodeId }) {
  try {
    const mapId = yield select(({ map }) => map.id);

    yield call(deleteEdge, mapId, edgeId, nodeId);
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* updateEdgeSaga({ updatedEdge }) {
  try {
    const mapId = yield select(({ map }) => map.id);

    yield call(updateEdge, mapId, updatedEdge);
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}


function* edgeSaga() {
  yield takeEvery(CREATE_EDGE, createEdgeSaga);
  yield takeEvery(DELETE_EDGE, deleteEdgeSaga);
  yield takeEvery(UPDATE_EDGE, updateEdgeSaga);
}

export default edgeSaga;
