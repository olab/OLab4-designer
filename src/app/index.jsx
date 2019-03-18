// @flow
import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Link,
} from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';

import Login from './Pages/Login';
import Constructor from './Pages/Constructor';

type Props = {
  isAuth: boolean,
};

type State = {
  appTitle: string,
};

class App extends Component<Props, State> {
  state = {
    appTitle: 'oLab',
  };

  render() {
    const { appTitle } = this.state;
    const { isAuth } = this.props;

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <span>{appTitle}</span>
            <Link to="/" className="App-route-link">
              Home
            </Link>
            {!isAuth && <Link to="/login" className="App-route-link">Login</Link>}
          </header>
          <Switch>
            <Route exact path="/" component={Constructor} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ user: { isAuth } }) => ({
  isAuth,
});

export default connect(mapStateToProps)(App);
