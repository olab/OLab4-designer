// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

import OutlinedSelect from '../../../shared/components/OutlinedSelect';
import CopyToClipboard from './CopyToClipboard';
import SearchBox from './SearchBox';

import CrossIcon from '../../../shared/assets/icons/cross.svg';
import UploadIcon from '../../../shared/assets/icons/add.svg';
import EyeIcon from '../../../shared/assets/icons/eye.svg';

import type { ISOPickerProps, ISOPickerState } from './types';
import { DndContexts, ModalsNames } from '../config';
import { SOTypes, SOLevels, SOItemsLimit } from './config';
import getFilterCallback from './utils';

import * as actions from '../action';

import styles, {
  ModalBody, ModalFooter, UploadButton,
  ConfigArticle, SOList, SOItem,
  SOItemTitle, SOItemHeader, SOItemSubTitle,
  EmptyList,
} from './styles';
import { ModalWrapper, ModalHeader } from '../styles';

export class SOPicker extends Component<ISOPickerProps, ISOPickerState> {
  searchBoxRef: { current: null | Element };

  constructor(props: ISOPickerProps) {
    super(props);
    this.state = {
      type: SOTypes[0],
      level: SOLevels[0],
      scopedObjectsFiltered: props.scopedObjects[SOTypes[0].toLowerCase()],
    };

    this.searchBoxRef = React.createRef();
  }

  handleCloseModal = () => {
    const { ACTION_CLOSE_MODAL, ACTION_SET_POSITION_MODAL } = this.props;
    ACTION_SET_POSITION_MODAL(0, 0);
    ACTION_CLOSE_MODAL();
  }

  handleModalMove(x: number, y: number) {
    const { ACTION_SET_POSITION_MODAL } = this.props;
    ACTION_SET_POSITION_MODAL(x, y);
  }

  handleTypeChange = (e: Event): void => {
    const { scopedObjects } = this.props;
    const { value } = (e.target: window.HTMLInputElement);

    if (this.searchBoxRef && this.searchBoxRef.current) {
      this.searchBoxRef.current.resetValue();
    }

    this.setState({
      type: value,
      scopedObjectsFiltered: scopedObjects[value.toLowerCase()],
    });
  }

  handleLevelChange = (e: Event): void => {
    const { type } = this.state;
    const { scopedObjects } = this.props;
    const { value: level } = (e.target: window.HTMLInputElement);
    const queryStr = this.searchBoxRef.current.state.value;
    const filterCallback = getFilterCallback(level, queryStr);
    const scopedObjectsFiltered = scopedObjects[type.toLowerCase()].filter(filterCallback);

    this.setState({
      level,
      scopedObjectsFiltered,
    });
  }

  handleSearch = (value: string): void => {
    const { type, level } = this.state;
    const { scopedObjects } = this.props;
    const queryStr = value.trim().toLowerCase();
    const filterCallback = getFilterCallback(level, queryStr);
    const scopedObjectsFiltered = scopedObjects[type.toLowerCase()].filter(filterCallback);

    this.setState({ scopedObjectsFiltered });
  }

  render() {
    const { type, level, scopedObjectsFiltered } = this.state;
    const {
      x, y, isDragging, connectDragSource, connectDragPreview, classes,
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
          <h4>SO Picker</h4>
          <button
            type="button"
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
            values={SOTypes}
            onChange={this.handleTypeChange}
            fullWidth
          />
          <OutlinedSelect
            label="Scoped Level"
            name="level"
            labelWidth={100}
            value={level}
            values={SOLevels}
            onChange={this.handleLevelChange}
            fullWidth
          />
        </ConfigArticle>
        <ModalBody>
          <SOList>
            {scopedObjectsFiltered.slice(0, SOItemsLimit).map(SO => (
              <SOItem key={SO.id}>
                <SOItemHeader>
                  <span>{SO.wiki}</span>
                  <CopyToClipboard text={SO.wiki} />
                  <IconButton
                    size="small"
                    classes={{ root: classes.iconButton }}
                  >
                    <EyeIcon />
                  </IconButton>
                </SOItemHeader>
                <SOItemTitle>{SO.name}</SOItemTitle>
                <SOItemSubTitle>{SO.description}</SOItemSubTitle>
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
  ...modals.SOPickerModal,
  scopedObjects: scopedObjects.data,
});

const mapDispatchToProps = dispatch => ({
  ACTION_CLOSE_MODAL: () => {
    dispatch(actions.ACTION_CLOSE_MODAL(
      ModalsNames.SO_PICKER_MODAL,
    ));
  },
  ACTION_SET_POSITION_MODAL: (x: number, y: number) => {
    dispatch(actions.ACTION_SET_POSITION_MODAL(
      ModalsNames.SO_PICKER_MODAL,
      x,
      y,
    ));
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
  withStyles(styles)(
    DragSource(
      DndContexts.VIEWPORT,
      spec,
      collect,
    )(SOPicker),
  ),
);
