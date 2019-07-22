import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';

import {
  createNode, deleteNode, updateNode,
} from '../../../../services/api/node';

import {
  CREATE_NODE, UPDATE_NODE, DELETE_NODE, CREATE_NODE_WITH_EDGE,
} from '../../../reducers/map/types';

import { ACTION_EXCHANGE_NODE_ID, ACTION_EXCHANGE_EDGE_ID } from '../../../reducers/map/action';
import { ACTION_NOTIFICATION_ERROR, ACTION_NOTIFICATION_SUCCESS } from '../../../reducers/notifications/action';

import { MESSAGES } from '../../../reducers/notifications/config';

function* createNodeSaga({ node: { id: oldNodeId, x, y } }) {
  try {
    const mapId = yield select(({ map }) => map.id);
    const newNodeId = yield call(createNode, mapId, { x, y });

    yield put(ACTION_EXCHANGE_NODE_ID(oldNodeId, newNodeId));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* createNodeWithEdgeSaga({
  sourceNodeId,
  node: { x, y, id: oldNodeId },
  edge: { id: oldEdgeId },
}) {
  try {
    const mapId = yield select(({ map }) => map.id);
    const { newNodeId, newEdgeId } = yield call(createNode, mapId, { x, y }, sourceNodeId);

    yield put(ACTION_EXCHANGE_NODE_ID(oldNodeId, newNodeId));
    yield put(ACTION_EXCHANGE_EDGE_ID(oldEdgeId, newEdgeId));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* updateNodeSaga({ node, isShowNotification }) {
  try {
    const mapId = yield select(({ map }) => map.id);

    yield call(updateNode, mapId, node);
    if (isShowNotification) {
      yield put(ACTION_NOTIFICATION_SUCCESS(MESSAGES.ON_UPDATE.NODE));
    }
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* deleteNodeSaga({ nodeId }) {
  try {
    const mapId = yield select(({ map }) => map.id);

    yield call(deleteNode, mapId, nodeId);
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* nodeSaga() {
  yield takeEvery(CREATE_NODE, createNodeSaga);
  yield takeEvery(UPDATE_NODE, updateNodeSaga);
  yield takeEvery(DELETE_NODE, deleteNodeSaga);
  yield takeEvery(CREATE_NODE_WITH_EDGE, createNodeWithEdgeSaga);
}

export default nodeSaga;
