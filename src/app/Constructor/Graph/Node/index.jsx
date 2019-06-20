// @flow
import * as d3 from 'd3';
import debounce from 'lodash.debounce';
import React from 'react';

import NodeComponent from './NodeComponent';

import {
  ACTION_COLLAPSE,
  ACTION_LOCK,
  ACTION_ADD,
  ACTION_RESIZE,
  ACTION_LINK,
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
      .on('drag', this.handleDragMove)
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

    const isResizeForbidden = !this.resizeRef.current || isCollapsed || !isResizeStart;

    if (isResizeForbidden) {
      return;
    }

    const { offsetWidth, offsetHeight } = this.resizeRef.current;
    const newWidth = offsetWidth - 4;
    const newHeight = offsetHeight - 2;

    if (newWidth !== width || newHeight !== height) {
      onNodeResize(id, newWidth, newHeight);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isResizeStart: false });
    }
  }

  calculateNewNodePosition = (data: NodeData) => {
    const { x, y, height } = data;
    const newNodeY = y + height / 2 + DEFAULT_NODE_INDENT;

    return { x, newNodeY };
  }

  callElementAction = (action: string) => {
    const {
      data,
      onNodeCollapsed,
      onNodeLocked,
      onNodeLink,
      onCreateNodeWithEdge,
    } = this.props;

    switch (action) {
      case ACTION_LOCK:
        onNodeLocked(data.id);
        break;
      case ACTION_COLLAPSE:
        onNodeCollapsed(data.id);
        break;
      case ACTION_ADD: {
        const { x, newNodeY: y } = this.calculateNewNodePosition(data);
        onCreateNodeWithEdge(x, y, data);
      } break;
      case ACTION_RESIZE:
        this.setState({ isResizeStart: true });
        break;
      case ACTION_LINK:
        onNodeLink(data);
        break;
      default: break;
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
    const isActionClickedAndAvailable = (!isLocked && action)
      || (isLocked && action === ACTION_LOCK);

    if (isActionClickedAndAvailable) {
      this.callElementAction(action);
    }
  }

  handleDragMove = () => {
    const {
      data: { id: dataId, isLocked }, layoutEngine, onNodeMove, isLinkingStarted,
    } = this.props;
    const { buttons, shiftKey } = d3.event.sourceEvent;
    const mouseButtonDown = buttons === 1;

    if (!mouseButtonDown || (isLocked && !shiftKey) || isLinkingStarted) {
      return;
    }

    const position = {
      x: d3.event.x,
      y: d3.event.y,
    };

    if (layoutEngine) {
      Object.assign(position, layoutEngine.calculatePosition(position));
    }

    onNodeMove(position, dataId);

    debounce(() => this.setState(position), 200, {
      trailing: true,
    });
  }

  handleDragStart = () => {
    const {
      data,
      data: { isLocked },
      isLinkingStarted,
      onNodeLink,
      ACTION_SAVE_MAP_TO_UNDO,
    } = this.props;
    const { shiftKey } = d3.event.sourceEvent;
    const { current: currentNodeRef } = this.nodeRef;
    const { parentElement: currentNodeRefParent } = currentNodeRef;

    if (shiftKey) {
      onNodeLink(data);
    }

    if (!currentNodeRef || isLocked || isLinkingStarted) {
      return;
    }

    ACTION_SAVE_MAP_TO_UNDO();

    // Moves child to the end of the element stack to re-arrange the z-index
    currentNodeRefParent.parentElement.appendChild(currentNodeRefParent);
  }

  handleDragEnd = () => {
    const { x, y } = this.state;
    const {
      data, onNodeUpdate, isLinkingStarted, onNodeSelected,
    } = this.props;
    const { current: currentNodeRef } = this.nodeRef;

    if (!currentNodeRef) {
      return;
    }

    const action = this.getClickedItemAction();

    if (!isLinkingStarted || (isLinkingStarted && (!action || action === ACTION_RESIZE))) {
      onNodeUpdate({ x, y }, data.id);
    }

    if (!action && !isLinkingStarted) {
      onNodeSelected(data);
    }
  }

  nodeRef: any;

  resizeRef: any;

  renderShape() {
    const {
      isLinkSource,
      data: {
        isCollapsed, isLocked, width: currentWidth, height, type, title, text, color,
      },
    } = this.props;

    const currentHeight = isCollapsed ? COLLAPSED_HEIGHT : height;

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
          width={currentWidth}
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
    const { x, y } = this.state;
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
