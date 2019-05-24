// @flow
import * as d3 from 'd3';
import React from 'react';

import NodeComponent from './NodeComponent';

import {
  ACTION_COLLAPSE,
  ACTION_LOCK,
  ACTION_ADD,
  ACTION_RESIZE,
  ACTION_LINK,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  COLLAPSED_HEIGHT,
  DEFAULT_NODE_INDENT,
} from './config';

import type {
  NodeData,
  INodeProps,
  INodeState,
} from './types';

export class Node extends React.Component<INodeProps, INodeState> {
  constructor(props: INodeProps) {
    super(props);
    this.state = {
      isResizeStart: false,
      isEdgeDrawing: false,
      x: props.data.x || 0,
      y: props.data.y || 0,
    };

    this.nodeRef = React.createRef();
    this.resizeRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps: INodeProps) {
    return {
      selected: nextProps.isSelected,
      x: nextProps.data.x,
      y: nextProps.data.y,
    };
  }

  componentDidMount() {
    const dragFunction = d3
      .drag()
      .on('start', this.handleDragStart)
      .on('drag', this.handleMouseMove)
      .on('end', this.handleDragEnd);

    d3
      .select(this.nodeRef.current)
      .on('mousedown', this.handleMouseDown)
      .call(dragFunction);
  }

  componentDidUpdate() {
    const { isResizeStart } = this.state;
    const {
      onNodeResize,
      data: {
        id, width, height, isCollapsed,
      },
    } = this.props;

    if (isCollapsed || !isResizeStart) {
      return;
    }

    if (this.resizeRef.current !== null) {
      const newWidth = this.resizeRef.current.offsetWidth - 4;
      const newHeight = this.resizeRef.current.offsetHeight - 2;
      if (newWidth !== width || newHeight !== height) {
        onNodeResize(id, newWidth, newHeight);
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ isResizeStart: false });
      }
    }
  }

  calculateNewNodePosition = (data: NodeData) => {
    const { x, y, height } = data;
    const newNodeY = y + height / 2 + DEFAULT_NODE_INDENT;
    return { x, newNodeY };
  }

  callElementAction = (action: string) => {
    const {
      data: {
        id,
      },
      data,
      onNodeCollapsed,
      onNodeLocked,
      onNodeLink,
      onCreateNodeWithEdge,
    } = this.props;

    switch (action) {
      case ACTION_LOCK:
        onNodeLocked(id);
        break;

      case ACTION_COLLAPSE:
        onNodeCollapsed(id);
        break;

      case ACTION_ADD: {
        const { x, newNodeY: y } = this.calculateNewNodePosition(data);
        onCreateNodeWithEdge(x, y, data);
        break;
      }
      case ACTION_RESIZE:
        this.setState({ isResizeStart: true });
        break;

      case ACTION_LINK:
        onNodeLink(data);
        break;
      default:
        break;
    }
  }

  getClickedItemAction = () => {
    const { isLinkingStarted } = this.props;
    const { sourceEvent: sourceEventD3, target: targetD3, shiftKey } = d3.event;
    const target = sourceEventD3 ? sourceEventD3.target : targetD3;

    const activeElement = target.closest('[data-active="true"]');

    if (!activeElement) {
      return null;
    }

    if (!shiftKey && !isLinkingStarted && d3.event.stopImmediatePropagation) {
      d3.event.stopImmediatePropagation();
    }

    const action = activeElement.getAttribute('data-action');

    return action;
  }

  handleMouseDown = () => {
    const { data: { isLocked } } = this.props;
    const action = this.getClickedItemAction();

    if (!action || (isLocked && action !== ACTION_LOCK)) {
      return;
    }

    this.callElementAction(action);
  }

  handleMouseMove = () => {
    const { isEdgeDrawing } = this.state;
    const {
      layoutEngine, data, data: { isLocked }, onNodeMove, isLinkingStarted,
    } = this.props;
    const { buttons, shiftKey } = d3.event.sourceEvent;
    const mouseButtonDown = buttons === 1;

    if (!mouseButtonDown || (isLocked && !shiftKey) || isLinkingStarted) {
      return;
    }
    // While the mouse is down, this function handles all mouse movement
    const newState = {
      x: d3.event.x,
      y: d3.event.y,
    };

    if (!isEdgeDrawing) {
      if (shiftKey) {
        this.setState({
          isEdgeDrawing: true,
        });
      } else if (layoutEngine) {
        // move node using the layout engine
        Object.assign(newState, layoutEngine.calculatePosition(newState));
      }
    }

    // Never use this.props.index because if the nodes array changes order
    // then this function could move the wrong node.
    onNodeMove(newState, data.id, shiftKey);

    this.setState(newState);
  }

  handleDragStart = () => {
    const { ACTION_SAVE_MAP_TO_UNDO, data: { isLocked }, isLinkingStarted } = this.props;
    const { current: currentNodeRef } = this.nodeRef;
    const { parentElement: currentNodeRefParent } = currentNodeRef;

    if (!currentNodeRef || isLocked || isLinkingStarted) {
      return;
    }

    ACTION_SAVE_MAP_TO_UNDO();

    // Moves child to the end of the element stack to re-arrange the z-index
    currentNodeRefParent.parentElement.appendChild(currentNodeRefParent);
  }

  handleDragEnd = () => {
    const { isLinkingStarted } = this.props;
    const { current: currentNodeRef } = this.nodeRef;

    if (!currentNodeRef) {
      return;
    }

    const { x, y } = this.state;
    const { data, onNodeUpdate, onNodeSelected } = this.props;
    const { shiftKey } = d3.event.sourceEvent;

    const action = this.getClickedItemAction();

    if (!isLinkingStarted || (isLinkingStarted && (!action || action === ACTION_RESIZE))) {
      onNodeUpdate({ x, y }, data.id, shiftKey || isLinkingStarted);
      onNodeSelected(data, shiftKey);
    }

    this.setState({ isEdgeDrawing: false });
  }

  nodeRef: any;

  resizeRef: any;

  renderShape() {
    const {
      isLinkSource,
      data: {
        isCollapsed, isLocked, width, height, type, title, text, color,
      },
    } = this.props;

    const currentWidth = width || DEFAULT_WIDTH;
    let currentHeight = height || DEFAULT_HEIGHT;

    currentHeight = isCollapsed ? COLLAPSED_HEIGHT : currentHeight;

    return (
      <foreignObject
        x={-currentWidth / 2}
        y={-currentHeight / 2}
        width={currentWidth}
        height={currentHeight}
        viewBox={`0 0 ${currentWidth} ${currentHeight}`}
      >
        <NodeComponent
          isLinked={isLinkSource}
          isLocked={isLocked}
          isCollapsed={isCollapsed}
          resizeRef={this.resizeRef}
          width={width}
          height={height}
          type={type}
          title={title}
          text={text}
          color={color}
        />
      </foreignObject>
    );
  }

  render() {
    const {
      x, y,
    } = this.state;
    const { id } = this.props;

    return (
      <g
        id={id}
        ref={this.nodeRef}
        transform={`translate(${x}, ${y})`}
      >
        {this.renderShape()}
      </g>
    );
  }
}

export default Node;
