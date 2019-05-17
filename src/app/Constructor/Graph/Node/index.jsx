// @flow
import * as d3 from 'd3';
import React from 'react';

import type {
  INodeProps,
  INodeState,
} from './types';

import {
  COLLAPSE_NODE,
  LOCK_NODE,
  ADD_NODE,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  RESIZE_NODE,
} from './config';

import NodeComponent from './NodeComponent';

export class Node extends React.Component<INodeProps, INodeState> {
  constructor(props: INodeProps) {
    super(props);
    this.state = {
      drawingEdge: false,
      // hovered: false,
      // selected: false,
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
      .on('drag', this.handleMouseMove)
      .on('start', this.handleDragStart)
      .on('end', this.handleDragEnd);
    d3
      .select(this.nodeRef.current)
      .on('mousedown', this.handleMouseDown)
      .on('mouseout', this.handleMouseOut)
      .call(dragFunction);
  }

  componentDidUpdate() {
    const {
      onNodeResize,
      data: {
        id, width, height, isCollapsed,
      },
    } = this.props;
    const { isResizeStart } = this.state;

    if (isCollapsed) {
      return;
    }
    if (!isResizeStart) {
      return;
    }
    if (this.resizeRef.current !== null) {
      const newWidth = this.resizeRef.current.offsetWidth;
      const newHeight = this.resizeRef.current.offsetHeight;
      if (newWidth !== width || newHeight !== height) {
        onNodeResize(id, newWidth, newHeight);
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ isResizeStart: false });
      }
    }
  }

  callElementAction = (action: string) => {
    const {
      data: {
        id, width, height, isCollapsed,
      },
      data,
      onNodeCollapsed,
      onNodeLocked,
      onCreateNodeWithEdge,
    } = this.props;

    switch (action) {
      case LOCK_NODE:
        onNodeLocked(id);
        break;

      case COLLAPSE_NODE:
        if (this.resizeRef.current !== null) {
          const newWidth = this.resizeRef.current.offsetWidth;
          const newHeight = this.resizeRef.current.offsetHeight;
          if (!isCollapsed) {
            onNodeCollapsed(id, newWidth, newHeight);
          } else onNodeCollapsed(id, width, height);
        }
        break;


      case ADD_NODE:
        onCreateNodeWithEdge(145, 670, data);
        break;

      case RESIZE_NODE:
        this.setState({ isResizeStart: true });
        break;

      default:
        break;
    }
  }

  handleMouseDown = () => {
    const { target, shiftKey } = d3.event;
    const { data: { isLocked } } = this.props;

    const activeElement = target.closest('[data-active="true"]');

    if (!activeElement) {
      return;
    }

    if (!shiftKey) {
      d3.event.stopImmediatePropagation();
    }

    const action = activeElement.getAttribute('data-action');

    if (isLocked && action !== LOCK_NODE) {
      return;
    }

    this.callElementAction(action);
  }

  handleMouseMove = () => {
    const { drawingEdge } = this.state;
    const { data: { isLocked } } = this.props;
    const {
      layoutEngine, data, onNodeMove,
    } = this.props;
    const { buttons, shiftKey } = d3.event.sourceEvent;
    const mouseButtonDown = buttons === 1;


    if (!mouseButtonDown) {
      return;
    }

    if (isLocked && !shiftKey) {
      return;
    }
    // While the mouse is down, this function handles all mouse movement
    const newState = {
      x: d3.event.x,
      y: d3.event.y,
    };


    if (shiftKey) {
      this.setState({ drawingEdge: true });
      // draw edge
      // undo the target offset subtraction done by Edge
      // const off = Edge.calculateOffset(data, newState, viewWrapperElem);
      // newState.x += off.xOff;
      // newState.y += off.yOff;
      // now tell the graph that we're actually drawing an edge
    } else if (!drawingEdge && layoutEngine) {
      // move node using the layout engine
      Object.assign(newState, layoutEngine.calculatePosition(newState));
    }
    this.setState(newState);
    // Never use this.props.index because if the nodes array changes order
    // then this function could move the wrong node.
    onNodeMove(newState, data.id, shiftKey);
  }

  handleDragStart = () => {
    const { ACTION_SAVE_MAP_TO_UNDO, data: { isLocked } } = this.props;
    const { current: currentNodeRef } = this.nodeRef;
    const { parentElement: currentNodeRefParent } = currentNodeRef;

    if (!currentNodeRef || isLocked) {
      return;
    }

    ACTION_SAVE_MAP_TO_UNDO();

    // Moves child to the end of the element stack to re-arrange the z-index
    currentNodeRefParent.parentElement.appendChild(currentNodeRefParent);
  }

  handleDragEnd = () => {
    const { current: currentNodeRef } = this.nodeRef;

    if (!currentNodeRef) {
      return;
    }

    const { x, y, drawingEdge } = this.state;
    const { data, onNodeUpdate, onNodeSelected } = this.props;
    const { shiftKey } = d3.event.sourceEvent;

    this.setState({ drawingEdge: false });

    onNodeUpdate(
      { x, y },
      data.id,
      shiftKey || drawingEdge,
    );

    onNodeSelected(data, data.id, shiftKey || drawingEdge);
  }

  handleMouseOver = (event: any) => {
    // Detect if mouse is already down and do nothing.
    let hovered = false;

    const { data, onNodeMouseEnter } = this.props;
    if ((d3.event && d3.event.buttons !== 1) || (event && event.buttons !== 1)) {
      hovered = true;
      // this.setState({ hovered });
    }

    onNodeMouseEnter(event, data, hovered);
  }

  handleMouseOut = (event: any) => {
    // Detect if mouse is already down and do nothing. Sometimes the system lags on
    // drag and we don't want the mouseOut to fire while the user is moving the
    // node around
    const { data, onNodeMouseLeave } = this.props;

    // this.setState({ hovered: false });
    onNodeMouseLeave(event, data);
  }

  nodeRef: any;

  resizeRef: any;

  renderShape() {
    const {
      data: {
        isCollapsed, isLocked, width, height, type,
      },
    } = this.props;

    const currentWidth = width || DEFAULT_WIDTH;
    const currentHeight = height || DEFAULT_HEIGHT;

    return (
      <foreignObject
        x={-currentWidth / 2}
        y={-currentHeight / 2}
        width={currentWidth}
        height={currentHeight}
        viewBox={`0 0 ${currentWidth} ${currentHeight}`}
      >
        <NodeComponent
          isLocked={isLocked}
          isCollapsed={isCollapsed}
          resizeRef={this.resizeRef}
          width={width}
          height={height}
          type={type}
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
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onFocus={() => undefined}
        onBlur={() => undefined}
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
