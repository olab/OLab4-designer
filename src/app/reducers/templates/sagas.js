/* eslint-disable no-unused-vars */
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { getTemplates, createTemplate } from '../../../services/api/templates';

import { CREATE_TEMPLATE_FROM_MAP, TEMPLATES_REQUESTED } from './types';
import { ACTION_NOTIFICATION_ERROR } from '../notifications/action';
import { ACTION_TEMPLATES_REQUEST_FAILED, ACTION_TEMPLATES_REQUEST_SUCCEEDED } from './action';

function* createTemplateSaga(action) {
  try {
    const data = yield call(createTemplate, action.template);
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* getTemplatesSaga() {
  try {
    const oldTemplates = yield select(({ templates }) => templates.list);
    const newTemplates = yield call(getTemplates);

    yield put(ACTION_TEMPLATES_REQUEST_SUCCEEDED(oldTemplates, newTemplates));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_TEMPLATES_REQUEST_FAILED());
    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* templatesSaga() {
  yield takeLatest(CREATE_TEMPLATE_FROM_MAP, createTemplateSaga);
  yield takeLatest(TEMPLATES_REQUESTED, getTemplatesSaga);
}

export default templatesSaga;
