// @flow
import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Link,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './Login';
import Constructor from './Constructor';
import { Header } from './styles';

import type {
  State,
  Props,
} from './types';

export class App extends Component<Props, State> {
  state = {
    appTitle: 'oLab',
  };

  render() {
    const { appTitle } = this.state;
    const { isAuth } = this.props;

    return (
      <Router>
        <>
          <Header>
            <span>{appTitle}</span>
            <Link to="/" className="route-link">
              Home
            </Link>
            {!isAuth && <Link to="/login" className="route-link">Login</Link>}
          </Header>
          <Switch>
            <Route exact path="/" component={Constructor} />
            <Route path="/login" component={Login} />
          </Switch>
        </>
      </Router>
    );
  }
}

const mapStateToProps = ({ user: { isAuth } }) => ({ isAuth });

export default connect(mapStateToProps)(App);
