// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Notify } from 'react-redux-notify';

import Login from './Login';
import Home from './Home';
import Constructor from './Constructor';
import CounterGrid from './CounterGrid';
import PageNotFound from './404';
import Header from './Header';
import SOEditor from './SOEditor';
import MapDetails from './MapDetails';
import AdvancedNodeEditor from './AdvancedNodeEditor';

import * as mapActions from './reducers/map/action';

import { LOCAL_STORAGE_KEY, SCOPED_OBJECT } from './config';

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
      <Redirect push to="/login" />
    ))}
  />
);

export class App extends PureComponent<IAppProps> {
  componentDidMount(): void {
    window.addEventListener('storage', this.handleStorageChange);
  }

  handleStorageChange = (event: Event): void => {
    const { newValue } = event;

    if (!newValue) {
      return;
    }

    const { ACTION_GET_NODE, nodeIdFromURL, isANE } = this.props;
    const { nodeId, mapId } = JSON.parse(newValue);
    const shouldRetrieveNode = !isANE || Number(nodeIdFromURL) === nodeId;

    if (shouldRetrieveNode) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      ACTION_GET_NODE(mapId, nodeId);
    }
  }

  render() {
    const { isAuth, history } = this.props;

    return (
      <ConnectedRouter history={history}>
        <>
          <Header />
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact isAuth={isAuth} path="/" component={Home} />
            <ProtectedRoute exact isAuth={isAuth} path="/:mapId" component={Constructor} />
            <ProtectedRoute exact isAuth={isAuth} path="/:mapId/mapdetails" component={MapDetails} />
            <ProtectedRoute exact isAuth={isAuth} path="/:mapId/countergrid" component={CounterGrid} />
            <ProtectedRoute exact isAuth={isAuth} path="/:mapId/:nodeId/ane" component={AdvancedNodeEditor} />
            <ProtectedRoute isAuth={isAuth} path={`/${SCOPED_OBJECT}/:scopedObjectType`} component={SOEditor} />
            <ProtectedRoute exact isAuth={isAuth} path="*" component={PageNotFound} />
          </Switch>
          <Notify />
        </>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = ({ user: { isAuth } }, { history: { location: { pathname } } }) => {
  const [,, nodeIdFromURL, isANE] = pathname.split('/');

  return {
    isAuth,
    nodeIdFromURL,
    isANE,
  };
};

const mapDispatchToProps = dispatch => ({
  ACTION_GET_NODE: (mapId: number, nodeId: number) => {
    dispatch(mapActions.ACTION_GET_NODE(mapId, nodeId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
