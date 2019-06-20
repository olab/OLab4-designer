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
import PageNotFound from './404';

import LogoIcon from '../shared/assets/icons/logo.svg';

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
          <Link to="/" className="route-link">
            <Logo>
              <LogoIcon />
              <h1>
                Open
                <span>Labyrinth</span>
              </h1>
            </Logo>
          </Link>
        </div>
        {isDataFetching ? <LinearProgress /> : <FakeProgress />}
      </Header>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact isAuth={isAuth} path="/" component={Home} />
        <ProtectedRoute exact isAuth={isAuth} path="/constructor/:mapId" component={Constructor} />
        <ProtectedRoute exact isAuth={isAuth} path="*" component={PageNotFound} />
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
