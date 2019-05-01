// @flow
import * as d3 from 'd3';
import React from 'react';

import Edge from '../Edge';

import type {
  INodeProps,
  INodeState,
} from './types';

import NodeComponent from './NodeComponent';

export class Node extends React.Component<INodeProps, INodeState> {
  constructor(props: INodeProps) {
    super(props);
    this.state = {
      drawingEdge: false,
      // hovered: false,
      // selected: false,
      width: 340,
      height: 180,
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

  handleMouseDown = () => {
    const { target } = d3.event;
    const { data: { id } } = this.props;
    const { onNodeCollapsed } = this.props;
    const collapsedIcon = target.closest('[data-id="collapse"]');
    if (collapsedIcon) {
      d3.event.stopImmediatePropagation();
      onNodeCollapsed(id);
    }
  }


  handleMouseMove = () => {
    const { drawingEdge } = this.state;
    const {
      layoutEngine, viewWrapperElem, data, onNodeMove,
    } = this.props;
    const { buttons, shiftKey } = d3.event.sourceEvent;
    const mouseButtonDown = buttons === 1;

    if (!mouseButtonDown) {
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
      const off = Edge.calculateOffset(data, newState, viewWrapperElem);
      newState.x += off.xOff;
      newState.y += off.yOff;
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
    const { ACTION_SAVE_GRAPH_TO_UNDO } = this.props;
    const { current: currentNodeRef } = this.nodeRef;
    const { parentElement: currentNodeRefParent } = currentNodeRef;

    if (!currentNodeRef) {
      return;
    }

    ACTION_SAVE_GRAPH_TO_UNDO();

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
    const { width, height } = this.state;
    const { data: { isCollapsed } } = this.props;

    return (
      <foreignObject x={-width / 2} y={-20} width={width} height={height} viewBox="0 0 100% 100%">
        <NodeComponent isCollapsed={isCollapsed} resizeRef={this.resizeRef} />
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
