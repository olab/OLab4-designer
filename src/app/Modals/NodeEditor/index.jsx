// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

import ScaleIcon from '../../../shared/assets/icons/cross.svg';

import type {
  INodeEditorProps,
  INodeEditorState,
} from './types';

import * as modalActions from '../action';
import * as mapActions from '../../reducers/map/action';
import { DndContexts, ModalsNames } from '../config';

import { NodeEditorTitle } from './styles';
import { ModalWrapper, ModalHeader } from '../commonStyles';

class NodeEditor extends Component<INodeEditorProps, INodeEditorState> {
  constructor(props: INodeEditorProps) {
    super(props);

    const { node } = this.props;
    this.state = {
      ...node,
    };
  }

  static getDerivedStateFromProps(nextProps: INodeEditorProps, state: INodeEditorState) {
    const { node } = nextProps;

    if (node.id !== state.id) {
      return {
        ...state,
        ...node,
      };
    }

    return null;
  }

  handleCloseModal = (): void => {
    const { ACTION_DESELECT_ITEM } = this.props;
    ACTION_DESELECT_ITEM();
  }

  handleModalMove = (x: number, y: number): void => {
    const { ACTION_SET_POSITION_NODE_EDITOR_MODAL } = this.props;
    ACTION_SET_POSITION_NODE_EDITOR_MODAL(x, y);
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
        ref={instance => connectDragPreview(instance)}
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      >
        <ModalHeader ref={instance => connectDragSource(instance)}>
          <NodeEditorTitle>Node Editor</NodeEditorTitle>
          <button
            type="button"
            onClick={this.handleCloseModal}
          >
            <ScaleIcon />

          </button>
        </ModalHeader>
      </ModalWrapper>
    );
  }
}

const mapStateToProps = ({ modals: { nodeEditorModal } }) => ({ ...nodeEditorModal });

const mapDispatchToProps = dispatch => ({
  ACTION_DESELECT_ITEM: () => {
    dispatch(mapActions.ACTION_SELECT_ITEM(null));
  },
  ACTION_SET_POSITION_NODE_EDITOR_MODAL: (x: number, y: number) => {
    dispatch(modalActions.ACTION_SET_POSITION_MODAL(
      ModalsNames.NODE_EDITOR_MODAL,
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
  DragSource(
    DndContexts.VIEWPORT,
    spec,
    collect,
  )(NodeEditor),
);
