// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Notify } from 'react-redux-notify';

import Login from './Login';
import Home from './Home';
import Constructor from './Constructor';
import PageNotFound from './404';
import Header from './Header';
import SOEditor from './SOEditor';

import type { IAppProps, IProtectedRouteProps } from './types';

import 'react-redux-notify/dist/ReactReduxNotify.css';

const ProtectedRoute = ({
  component: Component, isAuth, path, exact, ...rest
}: IProtectedRouteProps) => (
  <Route
    path={path}
    exact={exact}
    render={props => (isAuth ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    ))}
  />
);

export const App = ({ isAuth, history }: IAppProps) => (
  <ConnectedRouter history={history}>
    <>
      <Header />
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact isAuth={isAuth} path="/" component={Home} />
        <ProtectedRoute exact isAuth={isAuth} path="/constructor/:mapId" component={Constructor} />
        <ProtectedRoute isAuth={isAuth} path="/scopedObject/:scopedObjectType" component={SOEditor} />
        <ProtectedRoute exact isAuth={isAuth} path="*" component={PageNotFound} />
      </Switch>
      <Notify />
    </>
  </ConnectedRouter>
);

const mapStateToProps = ({ user }) => ({
  isAuth: user.isAuth,
});

export default connect(mapStateToProps)(App);
