// @flow
import * as d3 from 'd3';
import React from 'react';
import classNames from 'classnames';

import Edge from '../Edge';
import NodeText from './Text';

import type {
  INodeProps,
  INodeState,
} from './types';

class Node extends React.Component<INodeProps, INodeState> {
  constructor(props: INodeProps) {
    super(props);

    this.state = {
      drawingEdge: false,
      hovered: false,
      selected: false,
      x: props.data.x || 0,
      y: props.data.y || 0,
    };

    this.nodeRef = React.createRef();
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
      // .on('click', function(){console.log('CLICKED_HERE!!!')})
      // .on('mousedown', function(){console.log('d3:::', d3.event.target)})
      .on('mouseout', this.handleMouseOut)
      .call(dragFunction);
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
      const off = Edge.calculateOffset(data, newState, true, viewWrapperElem);
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

    if (!this.oldSibling) {
      this.oldSibling = currentNodeRefParent.nextSibling;
    }

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

    if (this.oldSibling && this.oldSibling.parentElement) {
      this.oldSibling.parentElement.insertBefore(currentNodeRef.parentElement, this.oldSibling);
    }

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
      this.setState({ hovered });
    }

    onNodeMouseEnter(event, data, hovered);
  }

  handleMouseOut = (event: any) => {
    // Detect if mouse is already down and do nothing. Sometimes the system lags on
    // drag and we don't want the mouseOut to fire while the user is moving the
    // node around

    const { data, onNodeMouseLeave } = this.props;

    this.setState({ hovered: false });
    onNodeMouseLeave(event, data);
  }

  nodeRef: any;

  oldSibling: any;

  renderText() {
    const { selected } = this.state;
    const { data } = this.props;

    return (<NodeText data={data} isSelected={selected} />);
  }

  renderShape() {
    const { hovered, selected } = this.state;
    // const { index } = this.props;

    // if (!this.nodeRef.current) {
    //   return null;
    // }

    // const { height, width } = this.nodeRef.current.getBBox();

    // const props = {
    //   height,
    //   width,
    // };
    const nodeShapeContainerClassName = classNames('shape');
    const nodeClassName = classNames('node', { selected, hovered });

    return (
      <g className={nodeShapeContainerClassName}>
        <circle
          // data-index={index}
          className={nodeClassName}
          // x={-props.width / 2}
          // y={-props.height / 2}
          // width={props.width}
          // height={props.height}
          r="76"
          fill="black"
        />
      </g>
    );
  }

  render() {
    const {
      x, y, hovered, selected,
    } = this.state;
    const { id, data } = this.props;
    const className = classNames('node', data.type, {
      hovered,
      selected,
    });

    return (
      <g
        className={className}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onFocus={() => undefined}
        onBlur={() => undefined}
        id={id}
        ref={this.nodeRef}
        transform={`translate(${x}, ${y})`}
      >
        {this.renderShape()}
        {this.renderText()}
      </g>
    );
  }
}

export default Node;
