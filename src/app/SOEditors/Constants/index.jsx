// @flow
/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Chip } from '@material-ui/core';

import OutlinedInput from '../../../shared/components/OutlinedInput';
import OutlinedSelect from '../../../shared/components/OutlinedSelect';
import EditorWrapper from '../../../shared/components/EditorWrapper';
import SearchModal from '../../../shared/components/SearchModal';

import type { IConstantsProps, IConstantsState, Icons } from './types';
import type { ScopeLevel as ScopeLevelType } from '../../reducers/scopeLevels/types';

import { EDITORS_FIELDS } from '../config';
import { SCOPE_LEVELS, SCOPED_OBJECTS } from '../../config';
import { getIconsByScopeLevel } from './utils';

import * as scopedObjectsActions from '../../reducers/scopedObjects/action';
import * as scopeLevelsActions from '../../reducers/scopeLevels/action';

import styles, { FieldLabel } from './styles';

class Constants extends PureComponent<IConstantsProps, IConstantsState> {
  parentIdRef: HTMLElement | null;

  scopeLevelObj: ScopeLevelType | null;

  icons: Icons;

  constructor(props: IConstantsProps) {
    super(props);
    this.state = {
      name: '',
      description: '',
      value: '',
      parentId: null,
      scopeLevel: SCOPE_LEVELS[0],
      isShowModal: false,
      isFieldsDisabled: false,
    };

    this.icons = getIconsByScopeLevel(SCOPE_LEVELS[0]);
  }

  componentDidUpdate(prevProps: IConstantsProps, prevState: IConstantsState) {
    const { scopeLevel, isShowModal } = this.state;
    const { scopeLevel: scopeLevelPrev, isShowModal: isShowModalPrev } = prevState;
    const { history, constants, isConstantCreating } = this.props;
    const { constants: constantsPrev, isConstantCreating: isConstantCreatingPrev } = prevProps;
    const isScopeLevelChanged = scopeLevel !== scopeLevelPrev;
    const isCreatingStarted = !isConstantCreatingPrev && isConstantCreating;
    const isCreatingEnded = isConstantCreatingPrev && !isConstantCreating;
    const isConstantCreated = constantsPrev.length < constants.length;
    const isModalClosed = isShowModalPrev && !isShowModal;

    if (isCreatingStarted) {
      this.toggleDisableFields();
    }

    if (isModalClosed) {
      this.blurParentInput();
    }

    if (isCreatingEnded) {
      if (isConstantCreated) {
        history.push('/constants');
      } else {
        this.toggleDisableFields();
      }
    }

    if (isScopeLevelChanged) {
      this.icons = getIconsByScopeLevel(scopeLevel);
      this.handleParentRemove();
    }
  }

  componentWillUnmount() {
    const { ACTION_SCOPE_LEVELS_CLEAR } = this.props;
    ACTION_SCOPE_LEVELS_CLEAR();
  }

  handleInputChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    this.setState({ [name]: value });
  }

  handleCreateScopedObject = (): void => {
    const { isShowModal, isFieldsDisabled, ...scopedObjectData } = this.state;
    const { ACTION_SCOPED_OBJECT_CREATE_REQUESTED } = this.props;
    const scopedObjectType = `${SCOPED_OBJECTS.CONSTANT.toLowerCase()}s`;

    ACTION_SCOPED_OBJECT_CREATE_REQUESTED(scopedObjectType, scopedObjectData);
  }

  toggleDisableFields = (): void => {
    this.setState(({ isFieldsDisabled }) => ({
      isFieldsDisabled: !isFieldsDisabled,
    }));
  }

  showModal = (): void => {
    const { scopeLevel } = this.state;
    const { ACTION_SCOPE_LEVELS_REQUESTED } = this.props;

    ACTION_SCOPE_LEVELS_REQUESTED(scopeLevel.toLowerCase());

    this.setState({ isShowModal: true });
  }

  hideModal = (): void => {
    this.setState({ isShowModal: false });
  }

  handleLevelObjChoose = (level: ScopeLevelType): void => {
    this.scopeLevelObj = level;
    this.setState({
      parentId: level.id,
      isShowModal: false,
    });
  }

  blurParentInput = (): void => {
    this.parentIdRef.blur();
  }

  setParentRef = (ref: HTMLElement): void => {
    this.parentIdRef = ref;
  }

  handleParentRemove = (): void => {
    this.scopeLevelObj = null;
    this.setState({ parentId: null });
  }

  render() {
    const {
      name, description, value, scopeLevel, isShowModal, isFieldsDisabled,
    } = this.state;
    const { classes, scopeLevels } = this.props;
    const { iconEven: IconEven, iconOdd: IconOdd } = this.icons;

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
            disabled={isFieldsDisabled}
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
            disabled={isFieldsDisabled}
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
            disabled={isFieldsDisabled}
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
          disabled={isFieldsDisabled}
        />
        <FieldLabel>
          {EDITORS_FIELDS.PARENT}
          <OutlinedInput
            name="parentId"
            placeholder={this.scopeLevelObj ? '' : 'Parent'}
            disabled={isFieldsDisabled}
            onFocus={this.showModal}
            setRef={this.setParentRef}
            readOnly
            fullWidth
          />
          {this.scopeLevelObj && (
            <Chip
              className={classes.chip}
              label={this.scopeLevelObj.name}
              variant="outlined"
              color="primary"
              onDelete={this.handleParentRemove}
              icon={<IconEven />}
            />
          )}
        </FieldLabel>

        {isShowModal && (
          <SearchModal
            label="Parent record"
            searchLabel="Search for parent record"
            items={scopeLevels[scopeLevel.toLowerCase()]}
            text={`Please choose appropriate parent from ${scopeLevel}:`}
            onClose={this.hideModal}
            onItemChoose={this.handleLevelObjChoose}
            isItemsFetching={scopeLevels.isFetching}
            iconEven={IconEven}
            iconOdd={IconOdd}
          />
        )}
      </EditorWrapper>
    );
  }
}

const mapStateToProps = ({ scopedObjects, scopeLevels }) => ({
  isConstantCreating: scopedObjects.isCreating,
  constants: scopedObjects.data[`${SCOPED_OBJECTS.CONSTANT.toLowerCase()}s`],
  scopeLevels,
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
  ACTION_SCOPE_LEVELS_REQUESTED: (scopeLevel: string) => {
    dispatch(scopeLevelsActions.ACTION_SCOPE_LEVELS_REQUESTED(scopeLevel));
  },
  ACTION_SCOPE_LEVELS_CLEAR: () => {
    dispatch(scopeLevelsActions.ACTION_SCOPE_LEVELS_CLEAR());
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
