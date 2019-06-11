import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';

import {
  createNode,
  deleteNode,
  updateNode,
} from '../../../../services/api/node';

import {
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  CREATE_NODE_WITH_EDGE,
} from '../../../reducers/map/types';
import { ACTION_EXCHANGE_NODE_ID } from '../../../reducers/map/action';
import { ACTION_NOTIFICATION_ERROR } from '../../../reducers/notifications/action';

function* createNodeSaga(action) {
  try {
    const mapId = yield select(({ map }) => map.id);
    const newNodeId = yield call(createNode, mapId);
    const oldNodeId = action.oldId || action.nodeData.data.id;

    yield put(ACTION_EXCHANGE_NODE_ID(oldNodeId, newNodeId));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* updateNodeSaga(action) {
  try {
    const mapId = yield select(({ map }) => map.id);
    yield call(updateNode, mapId, action.updatedNode);
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* deleteNodeSaga(action) {
  try {
    const mapId = yield select(({ map }) => map.id);
    yield call(deleteNode, mapId, action.nodeId);
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
  yield takeEvery(CREATE_NODE_WITH_EDGE, createNodeSaga);
}

export default nodeSaga;
