import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, { history } from './store/store';
import * as serviceWorker from './serviceWorker';

import App from './app';
import GlobalStyles from './styles';

const target = document.getElementById('root');

const Root = (
  <Provider store={store}>
    <GlobalStyles />
    <App history={history} />
  </Provider>
);

ReactDOM.render(Root, target);

serviceWorker.register();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
