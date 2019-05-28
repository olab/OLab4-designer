// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Notify } from 'react-redux-notify';
import LinearProgress from '@material-ui/core/LinearProgress';

import Login from './Login';
import Home from './Home';
import Constructor from './Constructor';
import {
  Logo,
  Header,
  FakeProgress,
} from './styles';

import type {
  IAppProps,
  IAppState,
} from './types';

import 'react-redux-notify/dist/ReactReduxNotify.css';

export class App extends PureComponent<IAppProps, IAppState> {
  render() {
    const { isAuth, isDataFetching, history } = this.props;

    return (
      <ConnectedRouter history={history}>
        <>
          <Header>
            <div>
              <Logo href="/">OLab</Logo>
              <nav>
                {!isAuth && <Link to="/login" className="route-link">Login</Link>}
                <Link to="/" className="route-link">
                  Home
                </Link>
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
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/constructor" component={Constructor} />
          </Switch>
          <Notify />
        </>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = ({
  user: { isAuth },
  map: { isFetching },
}) => ({
  isAuth,
  isDataFetching: isFetching,
});

export default connect(mapStateToProps)(App);
