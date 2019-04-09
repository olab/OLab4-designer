// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

import type { IMetaModalProps } from './types';
import { DndItemTypes } from './config';

import * as actions from '../action';

import './styles.scss';

export class MetaModal extends Component<IMetaModalProps> {
  handleCloseModal = () => {
    const { ACTION_CLOSE_META_MODAL, ACTION_SET_INIT_POSITION_META_MODAL } = this.props;
    ACTION_SET_INIT_POSITION_META_MODAL();
    ACTION_CLOSE_META_MODAL();
  }

  handleModalMove(x: number, y: number) {
    const { ACTION_SET_POSITION_META_MODAL } = this.props;
    ACTION_SET_POSITION_META_MODAL(x, y);
  }

  render() {
    const {
      connectDragSource, isDragging, x, y,
    } = this.props;

    if (isDragging) {
      return null;
    }

    return connectDragSource(
      <div
        className="meta-modal"
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      >
        <div>
          <span>---aka Modal---</span>
          <button
            type="button"
            onClick={this.handleCloseModal}
          >
            X
          </button>
        </div>
      </div>,
    );
  }
}

const mapStateToProps = ({ modals: { metaModal } }) => ({ ...metaModal });

const mapDispatchToProps = dispatch => ({
  ACTION_CLOSE_META_MODAL: () => {
    dispatch(actions.ACTION_CLOSE_META_MODAL());
  },
  ACTION_SET_POSITION_META_MODAL: (x: number, y: number) => {
    dispatch(actions.ACTION_SET_POSITION_META_MODAL(x, y));
  },
  ACTION_SET_INIT_POSITION_META_MODAL: () => {
    dispatch(actions.ACTION_SET_INIT_POSITION_META_MODAL());
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
  isDragging: monitor.isDragging(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DragSource(
  DndItemTypes.META_MODAL,
  spec,
  collect,
)(MetaModal));
