// @flow
import { fork } from 'redux-saga/effects';

import authUserSaga from '../app/Pages/Login/sagas';


export default function* root(): Generator<any, void, void> {
  yield fork(authUserSaga);
}
