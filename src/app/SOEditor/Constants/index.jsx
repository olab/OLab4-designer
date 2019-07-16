// @flow
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
import type { ScopedObjectBase as ScopedObjectBaseType } from '../../reducers/scopedObjects/types';

import { EDITORS_FIELDS } from '../config';
import { SCOPE_LEVELS, SCOPED_OBJECTS } from '../../config';
import { getIconsByScopeLevel } from './utils';
import { toLowerCaseAndPlural } from '../utils';

import * as scopedObjectsActions from '../../reducers/scopedObjects/action';
import * as scopeLevelsActions from '../../reducers/scopeLevels/action';

import styles, { FieldLabel } from './styles';

class Constants extends PureComponent<IConstantsProps, IConstantsState> {
  parentIdRef: HTMLElement | null;

  isEditMode: boolean = false;

  scopeLevelObj: ScopeLevelType | null;

  icons: Icons;

  constructor(props: IConstantsProps) {
    super(props);
    this.state = {
      name: '',
      description: '',
      value: '',
      scopeLevel: SCOPE_LEVELS[0],
      isShowModal: false,
      isFieldsDisabled: false,
    };

    this.checkIfEditMode();
    this.icons = getIconsByScopeLevel(SCOPE_LEVELS[0]);
  }

  componentDidUpdate(prevProps: IConstantsProps, prevState: IConstantsState) {
    const { scopeLevel, isShowModal } = this.state;
    const { scopeLevel: scopeLevelPrev, isShowModal: isShowModalPrev } = prevState;
    const {
      history,
      constants,
      isConstantCreating,
      isConstantUpdating,
      match: { params: { constantId } },
    } = this.props;
    const {
      constants: constantsPrev,
      isConstantCreating: isConstantCreatingPrev,
      isConstantUpdating: isConstantUpdatingPrev,
    } = prevProps;

    const isScopeLevelChanged = scopeLevel !== scopeLevelPrev;
    const isCreatingStarted = !isConstantCreatingPrev && isConstantCreating;
    const isCreatingEnded = isConstantCreatingPrev && !isConstantCreating;
    const isUpdatingStarted = !isConstantUpdatingPrev && isConstantUpdating;
    const isUpdatingEnded = isConstantUpdatingPrev && !isConstantUpdating;
    const isConstantCreated = constantsPrev.length < constants.length;
    const isModalClosed = isShowModalPrev && !isShowModal;
    const isConstantsUpdated = constantsPrev !== constants;

    if (isCreatingStarted || isUpdatingStarted) {
      this.toggleDisableFields();
    }

    if (isModalClosed) {
      this.blurParentInput();
    }

    if (isCreatingEnded || isUpdatingEnded) {
      if (isConstantCreated) {
        history.push(`/scopedObject/${SCOPED_OBJECTS.CONSTANT.toLowerCase()}`);
      } else {
        this.toggleDisableFields();
      }
    }

    if (isScopeLevelChanged) {
      this.icons = getIconsByScopeLevel(scopeLevel);
      this.handleParentRemove();
    }

    if (isConstantsUpdated && constantId) {
      const constant = constants.find(({ id }) => id === Number(constantId));

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ ...constant });
    }
  }

  checkIfEditMode = (): void => {
    const {
      match: { params: { constantId } }, ACTION_CONSTANT_DETAILS_REQUESTED,
    } = this.props;

    if (constantId) {
      ACTION_CONSTANT_DETAILS_REQUESTED(Number(constantId));

      this.isEditMode = true;
    }
  }

  handleInputChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    this.setState({ [name]: value });
  }

  handleSubmitScopedObject = (): void => {
    const scopedObjectData = { ...this.state };
    const {
      match: { params: { constantId } },
      ACTION_CONSTANT_CREATE_REQUESTED,
      ACTION_CONSTANT_UPDATE_REQUESTED,
    } = this.props;

    if (this.isEditMode) {
      ACTION_CONSTANT_UPDATE_REQUESTED(Number(constantId), scopedObjectData);
    } else {
      const { id: parentId } = this.scopeLevelObj;
      Object.assign(scopedObjectData, { parentId });

      ACTION_CONSTANT_CREATE_REQUESTED(scopedObjectData);
    }
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
    this.setState({ isShowModal: false });
  }

  blurParentInput = (): void => {
    this.parentIdRef.blur();
  }

  setParentRef = (ref: HTMLElement): void => {
    this.parentIdRef = ref;
  }

  handleParentRemove = (): void => {
    this.scopeLevelObj = null;
    this.forceUpdate();
  }

  render() {
    const {
      name, description, value, scopeLevel, isShowModal, isFieldsDisabled,
    } = this.state;
    const { classes, scopeLevels } = this.props;
    const { iconEven: IconEven, iconOdd: IconOdd } = this.icons;

    return (
      <EditorWrapper
        isEditMode={this.isEditMode}
        scopedObject={SCOPED_OBJECTS.CONSTANT}
        onSubmit={this.handleSubmitScopedObject}
      >
        <FieldLabel>
          {EDITORS_FIELDS.NAME}
          <OutlinedInput
            name="name"
            placeholder={EDITORS_FIELDS.NAME}
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
            placeholder={EDITORS_FIELDS.DESCRIPTION}
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
            placeholder={EDITORS_FIELDS.TEXT}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={value}
            onChange={this.handleInputChange}
            disabled={isFieldsDisabled}
            fullWidth
          />
        </FieldLabel>
        {!this.isEditMode && (
          <>
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
                placeholder={this.scopeLevelObj ? '' : EDITORS_FIELDS.PARENT}
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
          </>
        )}

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
  constants: scopedObjects[toLowerCaseAndPlural(SCOPED_OBJECTS.CONSTANT)],
  isConstantCreating: scopedObjects.isCreating,
  isConstantUpdating: scopedObjects.isUpdating,
  scopeLevels,
});

const mapDispatchToProps = dispatch => ({
  ACTION_SCOPE_LEVELS_REQUESTED: (scopeLevel: string) => {
    dispatch(scopeLevelsActions.ACTION_SCOPE_LEVELS_REQUESTED(scopeLevel));
  },
  ACTION_CONSTANT_DETAILS_REQUESTED: (scopedObjectId: number) => {
    dispatch(scopedObjectsActions.ACTION_SCOPED_OBJECT_DETAILS_REQUESTED(
      scopedObjectId,
      toLowerCaseAndPlural(SCOPED_OBJECTS.CONSTANT),
    ));
  },
  ACTION_CONSTANT_CREATE_REQUESTED: (scopedObjectData: ScopedObjectBaseType) => {
    dispatch(scopedObjectsActions.ACTION_SCOPED_OBJECT_CREATE_REQUESTED(
      toLowerCaseAndPlural(SCOPED_OBJECTS.CONSTANT),
      scopedObjectData,
    ));
  },
  ACTION_CONSTANT_UPDATE_REQUESTED: (
    scopedObjectId: number,
    scopedObjectData: ScopedObjectBaseType,
  ) => {
    dispatch(scopedObjectsActions.ACTION_SCOPED_OBJECT_UPDATE_REQUESTED(
      scopedObjectId,
      toLowerCaseAndPlural(SCOPED_OBJECTS.CONSTANT),
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
