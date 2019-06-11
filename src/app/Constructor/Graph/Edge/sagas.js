import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';

import {
  createEdge, deleteEdge,
} from '../../../../services/api/edge';

import { ACTION_EXCHANGE_EDGE_ID } from '../../../reducers/map/action';
import { ACTION_NOTIFICATION_ERROR } from '../../../reducers/notifications/action';

import {
  CREATE_EDGE,
  DELETE_EDGE,
} from '../../../reducers/map/types';

function* createEdgeSaga(action) {
  try {
    const { data: { id: prevEdgeId } } = action.edgeData;
    const mapId = yield select(({ map }) => map.id);

    const newEdgeId = yield call(createEdge, mapId, action.edgeData.data);
    const { edges } = yield select(({ map }) => ({
      edges: map.edges,
    }));

    yield put(ACTION_EXCHANGE_EDGE_ID(edges, prevEdgeId, newEdgeId));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* deleteEdgeSaga(action) {
  try {
    const { edgeId, nodeId } = action;
    const mapId = yield select(({ map }) => map.id);

    yield call(deleteEdge, mapId, edgeId, nodeId);
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}


function* edgeSaga() {
  yield takeEvery(CREATE_EDGE, createEdgeSaga);
  yield takeEvery(DELETE_EDGE, deleteEdgeSaga);
}

export default edgeSaga;
