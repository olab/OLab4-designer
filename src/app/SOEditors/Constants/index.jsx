// @flow
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

import OutlinedInput from '../../../shared/components/OutlinedInput';
import OutlinedSelect from '../../../shared/components/OutlinedSelect';
import EditorWrapper from '../../../shared/components/EditorWrapper';

import type { IConstantsProps, IConstantsState } from './types';

import { EDITORS_FIELDS } from '../config';
import { SCOPE_LEVELS, SCOPED_OBJECTS } from '../../config';

import * as scopedObjectsActions from '../../reducers/scopedObjects/action';

import styles, { FieldLabel } from './styles';

class Constants extends PureComponent<IConstantsProps, IConstantsState> {
  state: IConstantsState = {
    name: '',
    description: '',
    value: '',
    scopeLevel: SCOPE_LEVELS[0],
  };

  isFieldsDisabled: boolean = false;

  componentDidUpdate(prevProps) {
    const { constants: constantsPrev, isConstantCreating: isConstantCreatingPrev } = prevProps;
    const { history, constants, isConstantCreating } = this.props;
    const isCreatingStarted = !isConstantCreatingPrev && isConstantCreating;
    const isCreatingEnded = isConstantCreatingPrev && !isConstantCreating;
    const isConstantCreated = constantsPrev.length < constants.length;

    if (isCreatingStarted) {
      this.toggleDisableFields();
    }

    if (isCreatingEnded) {
      if (isConstantCreated) {
        history.push('/constants');
      } else {
        this.toggleDisableFields();
      }
    }
  }

  handleInputChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    this.setState({ [name]: value });
  }

  handleCreateScopedObject = (): void => {
    const scopedObjectData = this.state;
    const { ACTION_SCOPED_OBJECT_CREATE_REQUESTED } = this.props;
    const scopedObjectType = `${SCOPED_OBJECTS.CONSTANT.toLowerCase()}s`;

    ACTION_SCOPED_OBJECT_CREATE_REQUESTED(scopedObjectType, scopedObjectData);
  }

  toggleDisableFields = (): void => {
    this.isFieldsDisabled = !this.isFieldsDisabled;
    this.forceUpdate();
  }

  render() {
    const {
      name, description, value, scopeLevel,
    } = this.state;
    const { classes } = this.props;

    return (
      <EditorWrapper
        scopedObject={SCOPED_OBJECTS.CONSTANT}
        onSave={this.handleCreateScopedObject}
      >
        <FieldLabel>
          {EDITORS_FIELDS.NAME}
          <OutlinedInput
            name="name"
            placeholder="Name"
            value={name}
            onChange={this.handleInputChange}
            disabled={this.isFieldsDisabled}
            fullWidth
          />
        </FieldLabel>
        <FieldLabel>
          {EDITORS_FIELDS.DESCRIPTION}
          <TextField
            multiline
            rows="3"
            name="description"
            placeholder="Description"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={description}
            onChange={this.handleInputChange}
            disabled={this.isFieldsDisabled}
            fullWidth
          />
        </FieldLabel>
        <FieldLabel>
          {EDITORS_FIELDS.TEXT}
          <TextField
            multiline
            rows="6"
            name="value"
            placeholder="Text"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={value}
            onChange={this.handleInputChange}
            disabled={this.isFieldsDisabled}
            fullWidth
          />
        </FieldLabel>
        <FieldLabel>
          {EDITORS_FIELDS.SCOPE_LEVEL}
        </FieldLabel>
        <OutlinedSelect
          name="scopeLevel"
          value={scopeLevel}
          values={SCOPE_LEVELS}
          onChange={this.handleInputChange}
          disabled={this.isFieldsDisabled}
        />
      </EditorWrapper>
    );
  }
}

const mapStateToProps = ({ scopedObjects }) => ({
  isConstantCreating: scopedObjects.isCreating,
  constants: scopedObjects.data[`${SCOPED_OBJECTS.CONSTANT.toLowerCase()}s`],
});

const mapDispatchToProps = dispatch => ({
  ACTION_SCOPED_OBJECT_CREATE_REQUESTED: (
    scopedObjectType: string,
    scopedObjectData: IConstantsState,
  ) => {
    dispatch(scopedObjectsActions.ACTION_SCOPED_OBJECT_CREATE_REQUESTED(
      scopedObjectType,
      scopedObjectData,
    ));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withStyles(styles)(
    withRouter(Constants),
  ),
);
