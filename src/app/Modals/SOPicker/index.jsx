// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

import OutlinedSelect from '../../../shared/components/OutlinedSelect';
import CopyToClipboard from './CopyToClipboard';
import CrossIcon from '../../../shared/assets/icons/cross.svg';
import UploadIcon from '../../../shared/assets/icons/add.svg';
import SearchIcon from '../../../shared/assets/icons/search.svg';
import EyeIcon from '../../../shared/assets/icons/eye.svg';

import type { ISOPickerProps, ISOPickerState } from './types';
import { DndContexts, ModalsNames } from '../config';
import { SOTypes, SOLevels } from './config';

import * as actions from '../action';

import styles, {
  ModalBody, ModalFooter, UploadButton,
  SearchBox, SearchIconWrapper, ConfigArticle,
  SOList, SOItem, SOItemTitle, SOItemHeader,
  SOItemSubTitle,
} from './styles';
import { ModalWrapper, ModalHeader } from '../styles';

export class SOPicker extends Component<ISOPickerProps, ISOPickerState> {
  constructor(props: ISOPickerProps) {
    super(props);
    this.state = {
      type: SOTypes[0],
      level: SOLevels[0],
    };
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

  handleInputChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    this.setState({ [name]: value });
  }

  render() {
    const { type, level } = this.state;
    const {
      x, y, isDragging, connectDragSource, connectDragPreview, scopedObjects, classes,
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
            onChange={this.handleInputChange}
            fullWidth
          />
          <OutlinedSelect
            label="Scoped Level"
            name="level"
            labelWidth={100}
            value={level}
            values={SOLevels}
            onChange={this.handleInputChange}
            fullWidth
          />
        </ConfigArticle>
        <ModalBody>
          <SOList>
            {scopedObjects[type].map(SO => (
              <SOItem key={SO.id}>
                <SOItemHeader>
                  <span>{SO.shortCode}</span>
                  <CopyToClipboard text={SO.shortCode} />
                  <IconButton
                    size="small"
                    classes={{ root: classes.iconButton }}
                  >
                    <EyeIcon />
                  </IconButton>
                </SOItemHeader>
                <SOItemTitle>{SO.title}</SOItemTitle>
                <SOItemSubTitle>{SO.subTitle}</SOItemSubTitle>
              </SOItem>
            ))}
          </SOList>
        </ModalBody>
        <ModalFooter>
          <SearchBox>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <input
              name="search"
              type="search"
              placeholder="Search files"
              autoComplete="off"
            />
          </SearchBox>
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
