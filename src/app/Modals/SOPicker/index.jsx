// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

import CrossIcon from '../../../shared/assets/icons/cross.svg';

import type { ISOPickerProps } from './types';
import { DndContexts, ModalsNames } from '../config';

import * as actions from '../action';

import { ModalWrapper, ModalHeader } from '../commonStyles';

export class SOPicker extends Component<ISOPickerProps> {
  handleCloseModal = () => {
    const { ACTION_CLOSE_MODAL, ACTION_SET_POSITION_MODAL } = this.props;
    ACTION_SET_POSITION_MODAL(0, 0);
    ACTION_CLOSE_MODAL();
  }

  handleModalMove(x: number, y: number) {
    const { ACTION_SET_POSITION_MODAL } = this.props;
    ACTION_SET_POSITION_MODAL(x, y);
  }

  render() {
    const {
      x, y, isDragging, connectDragSource, connectDragPreview,
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
        {/* <ModalBody>

        </ModalBody> */}
      </ModalWrapper>
    );
  }
}

const mapStateToProps = ({ modals }) => ({ ...modals.SOPickerModal });

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
)(DragSource(
  DndContexts.VIEWPORT,
  spec,
  collect,
)(SOPicker));
