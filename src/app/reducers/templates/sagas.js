/* eslint-disable no-unused-vars */
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { createTemplate } from '../../../services/api/templates';

import { CREATE_TEMPLATE_FROM_MAP } from './types';

function* createTemplateSaga(action) {
  try {
    const data = yield call(createTemplate, action.template);
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

function* templatesSaga() {
  yield takeLatest(CREATE_TEMPLATE_FROM_MAP, createTemplateSaga);
}

export default templatesSaga;
