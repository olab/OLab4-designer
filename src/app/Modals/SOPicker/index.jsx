// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

import OutlinedSelect from '../../../shared/components/OutlinedSelect';
import CopyToClipboard from './CopyToClipboard';
import SearchBox from './SearchBox';
import EyeComponent from './EyeComponent';

import CrossIcon from '../../../shared/assets/icons/cross.svg';
import ReloadIcon from '../../../shared/assets/icons/reload.svg';
import UploadIcon from '../../../shared/assets/icons/add.svg';

import type { ScopedObject as ScopedObjectType } from '../../reducers/scopedObjects/types';
import type { ISOPickerProps, ISOPickerState } from './types';
import { DND_CONTEXTS, MODALS_NAMES } from '../config';
import { SO_TYPES, SO_LEVELS, SO_ITEMS_LIMIT } from './config';
import getFilterCallback from './utils';

import * as modalActions from '../action';
import * as scopedObjectsActions from '../../reducers/scopedObjects/action';

import {
  ModalBody, ModalFooter, UploadButton,
  ConfigArticle, SOList, SOItem,
  SOItemTitle, SOItemHeader,
  EmptyList, ReloadIconWrapper,
} from './styles';
import { ModalWrapper, ModalHeader } from '../styles';

export class SOPicker extends PureComponent<ISOPickerProps, ISOPickerState> {
  searchBoxRef: { current: null | Element };

  modalBodyRef: { current: null | Element };

  constructor(props: ISOPickerProps) {
    super(props);
    this.state = {
      type: SO_TYPES[0],
      level: SO_LEVELS[0],
      scopedObjectsFiltered: props.scopedObjects[SO_TYPES[0].toLowerCase()],
      isScrollbarVisible: false,
    };

    this.searchBoxRef = React.createRef();
    this.modalBodyRef = React.createRef();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: ISOPickerProps) {
    if (this.searchBoxRef.current) {
      const { type, level } = this.state;
      const queryStr = this.searchBoxRef.current.state.value;
      const filterCallback = getFilterCallback(level, queryStr);
      const scopedObjectsFiltered = nextProps.scopedObjects[type.toLowerCase()]
        .filter(filterCallback);

      this.setState({ scopedObjectsFiltered });
    }
  }

  componentDidUpdate(prevProps: ISOPickerProps, prevState: ISOPickerState) {
    const isScrollbarVisible = this.checkIfScrollbarVisible();

    if (prevState.isScrollbarVisible !== isScrollbarVisible) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isScrollbarVisible });
    }
  }

  getFilteredScopedObjects = (
    level: string,
    type: string,
    queryStr: string,
  ): Array<ScopedObjectType> => {
    const { scopedObjects } = this.props;
    const filterCallback = getFilterCallback(level, queryStr);

    return scopedObjects[type.toLowerCase()].filter(filterCallback);
  }

  handleCloseModal = (): void => {
    const { ACTION_CLOSE_MODAL, ACTION_SET_POSITION_MODAL } = this.props;
    ACTION_SET_POSITION_MODAL(0, 0);
    ACTION_CLOSE_MODAL();
  }

  handleModalMove(x: number, y: number): void {
    const { ACTION_SET_POSITION_MODAL } = this.props;
    ACTION_SET_POSITION_MODAL(x, y);
  }

  handleTypeChange = (e: Event): void => {
    const { level } = this.state;
    const { value: type } = (e.target: window.HTMLInputElement);
    const queryStr = this.searchBoxRef.current.state.value;
    const scopedObjectsFiltered = this.getFilteredScopedObjects(level, type, queryStr);

    this.searchBoxRef.current.resetValue();

    this.setState({
      type,
      scopedObjectsFiltered,
    });
  }

  handleLevelChange = (e: Event): void => {
    const { type } = this.state;
    const { value: level } = (e.target: window.HTMLInputElement);
    const queryStr = this.searchBoxRef.current.state.value;
    const scopedObjectsFiltered = this.getFilteredScopedObjects(level, type, queryStr);

    this.setState({
      level,
      scopedObjectsFiltered,
    });
  }

  handleSearch = (queryStr: string): void => {
    const { type, level } = this.state;
    const scopedObjectsFiltered = this.getFilteredScopedObjects(level, type, queryStr);

    this.setState({ scopedObjectsFiltered });
  }

  checkIfScrollbarVisible = (): boolean => {
    if (!this.modalBodyRef || !this.modalBodyRef.current) {
      return false;
    }

    const { scrollHeight, clientHeight } = this.modalBodyRef.current;
    return scrollHeight > clientHeight;
  }

  handleFetchScopedObjects = (): void => {
    const { ACTION_SCOPED_OBJECTS_REQUESTED } = this.props;
    ACTION_SCOPED_OBJECTS_REQUESTED();
  }

  render() {
    const {
      type, level, scopedObjectsFiltered, isScrollbarVisible,
    } = this.state;
    const {
      x, y, isDragging, connectDragSource, connectDragPreview, isFetching,
    } = this.props;

    if (isDragging) {
      return null;
    }

    return (
      <ModalWrapper
        x={x}
        y={y}
        ref={instance => connectDragPreview(instance)}
      >
        <ModalHeader ref={instance => connectDragSource(instance)}>
          <h4>Object Picker</h4>
          <button
            type="button"
            title="Refresh"
            onClick={this.handleFetchScopedObjects}
          >
            <ReloadIconWrapper isRotating={isFetching}>
              <ReloadIcon />
            </ReloadIconWrapper>
          </button>
          <button
            type="button"
            title="Close"
            onClick={this.handleCloseModal}
          >
            <CrossIcon />
          </button>
        </ModalHeader>
        <ConfigArticle>
          <OutlinedSelect
            label="SO Type"
            name="type"
            labelWidth={65}
            value={type}
            values={SO_TYPES}
            onChange={this.handleTypeChange}
            fullWidth
          />
          <OutlinedSelect
            label="Scoped Level"
            name="level"
            labelWidth={100}
            value={level}
            values={SO_LEVELS}
            onChange={this.handleLevelChange}
            fullWidth
          />
        </ConfigArticle>
        <ModalBody
          ref={this.modalBodyRef}
          isScrollbarVisible={isScrollbarVisible}
        >
          <SOList>
            {scopedObjectsFiltered.slice(0, SO_ITEMS_LIMIT).map(SO => (
              <SOItem key={SO.id}>
                <SOItemHeader>
                  <span>{SO.wiki}</span>
                  <CopyToClipboard text={SO.wiki} />
                  {SO.isShowEyeIcon && (
                    <EyeComponent
                      scopedObjectId={SO.id}
                      scopedObjectType={type.toLowerCase()}
                      additionalInfo={SO.details}
                      isShowSpinner={SO.isDetailsFetching}
                    />
                  )}
                </SOItemHeader>
                <SOItemTitle title={SO.name}>{SO.name}</SOItemTitle>
              </SOItem>
            ))}
          </SOList>
          {!scopedObjectsFiltered.length && (
            <EmptyList>Empty list...</EmptyList>
          )}
        </ModalBody>
        <ModalFooter>
          <SearchBox
            innerRef={this.searchBoxRef}
            onSearch={this.handleSearch}
          />
          <label htmlFor="upload_file">
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="upload_file"
              multiple
            />
            <UploadButton>
              <UploadIcon />
                Add files
            </UploadButton>
          </label>
        </ModalFooter>
      </ModalWrapper>
    );
  }
}

const mapStateToProps = ({
  modals,
  scopedObjects,
}) => ({
  ...modals[MODALS_NAMES.SO_PICKER_MODAL],
  scopedObjects: scopedObjects.data,
  isFetching: scopedObjects.isFetching,
});

const mapDispatchToProps = dispatch => ({
  ACTION_CLOSE_MODAL: () => {
    dispatch(modalActions.ACTION_CLOSE_MODAL(
      MODALS_NAMES.SO_PICKER_MODAL,
    ));
  },
  ACTION_SET_POSITION_MODAL: (x: number, y: number) => {
    dispatch(modalActions.ACTION_SET_POSITION_MODAL(
      MODALS_NAMES.SO_PICKER_MODAL,
      x,
      y,
    ));
  },
  ACTION_SCOPED_OBJECTS_REQUESTED: () => {
    dispatch(scopedObjectsActions.ACTION_SCOPED_OBJECTS_REQUESTED());
  },
});

/*
  It describes how the drop target reacts to the drag and drop events.
  See docs here: http://react-dnd.github.io/react-dnd/docs/api/drag-source#parameters
*/
const spec = {
  beginDrag: props => props,
  endDrag: (props, monitor, component) => {
    if (!monitor.didDrop()) {
      return;
    }

    const dropResult = monitor.getDropResult();

    if (!dropResult) {
      return;
    }

    const { x: offsetX, y: offsetY } = dropResult;
    const x = offsetX + props.x;
    const y = offsetY + props.y;

    component.handleModalMove(x, y);
  },
};

/*
  It should return a plain object of the props to inject into your component.
  It receives two parameters: connect and monitor.
  See docs here: http://react-dnd.github.io/react-dnd/docs/api/drag-source#parameters
*/
const collect = (conn, monitor) => ({
  connectDragSource: conn.dragSource(),
  connectDragPreview: conn.dragPreview(),
  isDragging: monitor.isDragging(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  DragSource(
    DND_CONTEXTS.VIEWPORT,
    spec,
    collect,
  )(SOPicker),
);
