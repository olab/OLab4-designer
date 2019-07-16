// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Constants from './Constants';
import SOList from './SOList';

import * as scopeLevelsActions from '../reducers/scopeLevels/action';
import * as scopedObjectsActions from '../reducers/scopedObjects/action';

import type { ISOEditorProps } from './types';

class SOEditor extends PureComponent<ISOEditorProps> {
  componentWillUnmount() {
    const {
      ACTION_SCOPE_LEVELS_CLEAR,
      ACTION_SCOPED_OBJECTS_CLEAR,
    } = this.props;

    ACTION_SCOPE_LEVELS_CLEAR();
    ACTION_SCOPED_OBJECTS_CLEAR();
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/scopedObject/:scopedObjectType"
          component={SOList}
        />
        <Route
          exact
          path={['/scopedObject/constant/add', '/scopedObject/constant/:constantId']}
          component={Constants}
        />
      </Switch>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ACTION_SCOPE_LEVELS_CLEAR: () => {
    dispatch(scopeLevelsActions.ACTION_SCOPE_LEVELS_CLEAR());
  },
  ACTION_SCOPED_OBJECTS_CLEAR: () => {
    dispatch(scopedObjectsActions.ACTION_SCOPED_OBJECTS_CLEAR());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(SOEditor);
