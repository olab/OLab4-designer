import { call, put, takeLatest } from 'redux-saga/effects';
import { postUser } from '../../services/api/auth';
import { ACTION_NOTIFICATION_ERROR } from '../reducers/notifications/action';

import { USER_AUTH_FAILED, USER_AUTH_REQUESTED, USER_AUTH_SUCCEEDED } from './types';

function* authUser(action) {
  try {
    const { token } = yield call(postUser, action.userLoginData);
    yield put({ type: USER_AUTH_SUCCEEDED, token });
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.data.message : message;

    yield put({
      type: USER_AUTH_FAILED,
      errorMessage,
    });

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
    // TODO: handling of errors
  }
}

function* authUserSaga() {
  yield takeLatest(USER_AUTH_REQUESTED, authUser);
}

export default authUserSaga;
