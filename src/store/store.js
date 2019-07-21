import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import notifyReducer from 'react-redux-notify';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';

import undoRedoMiddleware from './undoRedoMiddleware';

import config from './storeConfig';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import initialState from './initialState';

export const history = createBrowserHistory({
  basename: config.baseHref,
});
const sagaMiddleware = createSagaMiddleware();

const enhancers = [];
const middleware = [
  sagaMiddleware,
  routerMiddleware(history),
  undoRedoMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__; // eslint-disable-line

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const reducer = combineReducers({
  router: connectRouter(history),
  notifications: notifyReducer,
  ...rootReducer,
});

const store = createStore(
  connectRouter(history)(reducer),
  initialState,
  composedEnhancers,
);

sagaMiddleware.run(rootSaga);

export default store;
