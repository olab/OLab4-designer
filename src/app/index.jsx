// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  Route, Switch, Link, Redirect,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Notify } from 'react-redux-notify';
import LinearProgress from '@material-ui/core/LinearProgress';

import Login from './Login';
import Home from './Home';
import Constructor from './Constructor';

import type {
  IAppProps,
  IProtectedRouteProps,
} from './types';

import {
  Logo,
  Header,
  FakeProgress,
} from './styles';

import 'react-redux-notify/dist/ReactReduxNotify.css';

const ProtectedRoute = ({
  component: Component, isAuth, path, ...rest
}: IProtectedRouteProps) => (
  <Route
    path={path}
    {...rest}
    render={props => (isAuth ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    ))}
  />
);

export const App = ({ isAuth, isDataFetching, history }: IAppProps) => (
  <ConnectedRouter history={history}>
    <>
      <Header>
        <div>
          <Logo href="/">OLab</Logo>
          <nav>
            {!isAuth && <Link to="/login" className="route-link">Login</Link>}
            <Link to="/" className="route-link">Home</Link>
            <Link to="/constructor" className="route-link">
              Map Layout Editor
            </Link>
          </nav>
        </div>
        {isDataFetching ? (
          <LinearProgress />
        ) : (
          <FakeProgress />
        )}
      </Header>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact isAuth={isAuth} path="/" component={Home} />
        <ProtectedRoute exact isAuth={isAuth} path="/constructor" component={Constructor} />
      </Switch>
      <Notify />
    </>
  </ConnectedRouter>
);

const mapStateToProps = ({
  user: { isAuth, isFetching: isAuthFething },
  map: { isFetching: isMapFetching },
}) => ({
  isAuth,
  isDataFetching: isAuthFething || isMapFetching,
});

export default connect(mapStateToProps)(App);
