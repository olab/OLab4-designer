// @flow
/* eslint-disable react/no-unused-state */
/*
The top-level component digraph component.
Here it is possible to manipilate with nodes and edges.
*/
import * as d3 from 'd3';
import React from 'react';
import isEqual from 'lodash.isequal';
import omit from 'lodash.omit';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import Background from '../Background';
import Defs from '../Defs';
import Edge from '../Edge';
import ZoomControls from '../ZoomControls';
import Node from '../Node';

import LayoutEngines from '../utilities/layout-engine/layout-engine-config';

import type {
  INode,
  IPoint,
} from '../Node/types';
import type {
  INodeMapNode,
  IGraphViewState,
  IGraphViewProps,
} from './types';
import type { EdgeData as EdgeDataType } from '../Edge/types';

import GraphUtils from '../utilities/graph-utils';

import * as actions from '../../../reducers/map/action';

import { ViewWrapper, GraphWrapper } from './styles';

export class GraphView extends React.Component<IGraphViewProps, IGraphViewState> {
  constructor(props: IGraphViewProps) {
    super(props);

    this.nodeTimeouts = {};
    this.edgeTimeouts = {};
    this.renderNodesTimeout = null;
    this.renderEdgesTimeout = null;
    this.viewWrapper = React.createRef();
    this.graphSvg = React.createRef();

    if (props.layoutEngineType) {
      this.layoutEngine = new LayoutEngines[props.layoutEngineType](props);
    }

    this.state = {
      componentUpToDate: false,
      draggedEdge: null,
      draggingEdge: false,
      edgeEndNode: null,
      edges: [],
      edgesMap: {},
      hoveredNode: false,
      hoveredNodeData: null,
      nodes: [],
      nodesMap: {},
      selectedEdgeObj: null,
      selectedNodeObj: null,
      selectingNode: false,
      documentClicked: false,
      svgClicked: false,
      focused: true,
    };
  }

  static defaultProps = {
    canCreateEdge: () => true,
    canDeleteEdge: () => true,
    canDeleteNode: () => true,
    edgeArrowSize: 6,
    gridSpacing: 36,
    layoutEngineType: 'None',
    maxTitleChars: 9,
    maxZoom: 1.5,
    minZoom: 0.15,
    readOnly: false,
    zoomDelay: 1000,
    zoomDur: 750,
  };

  static getDerivedStateFromProps(nextProps: IGraphViewProps, prevState: IGraphViewState) {
    let { nodes } = nextProps;
    const { edges } = nextProps;
    const nodesMap = GraphUtils.getNodesMap(nodes);
    const edgesMap = GraphUtils.getEdgesMap(edges);
    GraphUtils.linkNodesAndEdges(nodesMap, edges);

    const selectedNodeMap = nextProps.selected && nodesMap[`key-${nextProps.selected.id}`]
      ? nodesMap[`key-${nextProps.selected.id}`]
      : null;
    const selectedEdgeMap = nextProps.selected && edgesMap[`${nextProps.selected.source}_${nextProps.selected.target}`]
      ? edgesMap[`${nextProps.selected.source}_${nextProps.selected.target}`]
      : null;

    // Handle layoutEngine on initial render
    if (prevState.nodes.length === 0
        && nextProps.layoutEngineType
        && LayoutEngines[nextProps.layoutEngineType]
    ) {
      const layoutEngine = new LayoutEngines[nextProps.layoutEngineType](nextProps);
      nodes = layoutEngine.adjustNodes(nodes, nodesMap);
    }

    const nextState = {
      componentUpToDate: true,
      edges,
      edgesMap,
      nodes,
      nodesMap,
      readOnly: nextProps.readOnly,
      selectedEdgeObj: {
        edge: selectedEdgeMap ? selectedEdgeMap.edge : null,
      },
      selectedNodeObj: {
        nodeId: selectedNodeMap ? nextProps.selected.id : null,
        node: selectedNodeMap ? selectedNodeMap.node : null,
      },
      selectionChanged: false,
    };

    return nextState;
  }

  /**
   *
   *
   * @static
   * @param {INode} sourceNode
   * @param {(INode | null)} hoveredNode
   * @param {*} swapEdge
   * @returns
   * @memberof GraphView
   *
   * Checks if edge can be swapped.
   */
  static canSwap(sourceNode: INode, hoveredNode: INode | null, swapEdge: any) {
    return (hoveredNode && sourceNode !== hoveredNode
      && (swapEdge.source !== sourceNode.id
        || swapEdge.target !== hoveredNode.id));
  }

  /**
   *
   *
   * @static
   * @param {string} source
   * @param {string} target
   * @memberof GraphView
   *
   * Removes Edge from DOM.
   */
  static removeEdgeElement(source: string, target: string) {
    const id = `${source}-${target}`;
    GraphUtils.removeElementFromDom(`edge-${id}-container`);
  }

  /**
   *
   *
   * @static
   * @param {*} element
   * @returns
   * @memberof GraphView
   *
   * Checks whether clicked item is in the edge.
   */
  static isPartOfEdge(element: any) {
    return !!GraphUtils.findParent(element, '.edge-container');
  }

  /**
   *
   *
   * @static
   * @returns
   * @memberof GraphView
   *
   * Stops zoom whether if ctrl or some button on keyboard is pressed.
   */
  static zoomFilter() {
    const { button, ctrlKey } = d3.event;

    if (button || ctrlKey) {
      return false;
    }

    return true;
  }

  componentDidMount() {
    const { minZoom = 0, maxZoom = 0, zoomDelay } = this.props;

    // TODO: can we target the element rather than the document?
    document.addEventListener('keydown', this.handleWrapperKeydown);
    document.addEventListener('click', this.handleDocumentClick);

    this.zoom = d3
      .zoom()
      .filter(GraphView.zoomFilter)
      .scaleExtent([minZoom, maxZoom])
      .on('start', this.handleZoomStart)
      .on('zoom', this.handleZoom)
      .on('end', this.handleZoomEnd);

    d3
      .select(this.viewWrapper.current)
      .on('click', this.handleSvgClicked) // handle element click in the element components
      .select('svg')
      .on('zoom.dbclick', null)
      .call(this.zoom);
    this.selectedView = d3.select(this.view);

    // On the initial load, the 'view' <g> doesn't exist until componentDidMount.
    // Manually render the first view.
    this.renderView();
    this.asyncHandleZoomToFit(zoomDelay);
  }

  shouldComponentUpdate(nextProps: IGraphViewProps, nextState: IGraphViewState) {
    const {
      nodes, edges, selected, readOnly, layoutEngineType,
    } = this.props;

    if (nextProps.nodes !== nodes
      || nextProps.edges !== edges
      || !nextState.componentUpToDate
      || nextProps.selected !== selected
      || nextProps.readOnly !== readOnly
      || nextProps.layoutEngineType !== layoutEngineType) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps: IGraphViewProps, prevState: IGraphViewState) {
    const {
      nodesMap,
      edgesMap,
      nodes: stateNodes,
      edges: stateEdges,
      selectedNodeObj,
      selectedEdgeObj,
      componentUpToDate,
    } = this.state;
    const {
      edges: propsEdges, nodes: propsNodes, layoutEngineType,
    } = this.props;

    if (layoutEngineType && LayoutEngines[layoutEngineType]) {
      this.layoutEngine = new LayoutEngines[layoutEngineType](this.props);

      const newNodes = this.layoutEngine.adjustNodes(stateNodes, nodesMap);
      if (!isEqual(stateNodes, newNodes)) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          nodes: newNodes,
        });
      }
    }

    const forceReRender = propsNodes !== prevProps.nodes || propsEdges !== prevProps.edges;

    // Note: the order is intentional
    // remove old edges
    this.removeOldEdges(prevState.edges, edgesMap);

    // remove old nodes
    this.removeOldNodes(prevState.nodes, prevState.nodesMap, nodesMap);

    // add new nodes
    this.addNewNodes(
      stateNodes,
      prevState.nodesMap,
      selectedNodeObj,
      prevState.selectedNodeObj,
      forceReRender,
    );

    // add new edges
    this.addNewEdges(
      stateEdges,
      prevState.edgesMap,
      selectedEdgeObj,
      prevState.selectedEdgeObj,
      forceReRender,
    );

    if (!componentUpToDate) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        componentUpToDate: true,
      });
    }

    this.asyncHandleZoomToFit(50);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleWrapperKeydown);
    document.removeEventListener('click', this.handleDocumentClick);
  }

  asyncHandleZoomToFit = (delay: number = 0): void => {
    setTimeout(() => {
      if (this.viewWrapper != null && this.entities) {
        this.handleZoomToFit();
      }
    }, delay);
  }

  getNodeById(id: string | null, nodesMap: any | null): INodeMapNode | null {
    const { nodesMap: stateNodesMap } = this.state;
    const nodesMapVar = nodesMap || stateNodesMap;

    return nodesMapVar ? nodesMapVar[`key-${id || ''}`] : null;
  }

  getEdgeBySourceTarget(source: string, target: string): EdgeDataType | null {
    const { edgesMap } = this.state;

    return edgesMap ? edgesMap[`${source}_${target}`] : null;
  }

  addNewNodes(
    nodes: Array<INode>,
    oldNodesMap: any,
    selectedNode: any,
    prevSelectedNode: any,
    forceRender: boolean = false,
  ) {
    const { draggingEdge } = this.state;

    if (draggingEdge) {
      return;
    }

    let node = null;
    let prevNode = null;

    GraphUtils.yieldingLoop(nodes.length, 50, (i: number) => {
      node = nodes[i];
      prevNode = this.getNodeById(node.id, oldNodesMap);
      // if there was a previous node and it changed
      if (prevNode != null
        && (prevNode.node !== node
          || (selectedNode.node !== prevSelectedNode.node
            && ((selectedNode.node && node.id === selectedNode.node.id)
              || (prevSelectedNode.node && node.id === prevSelectedNode.node.id))))) {
        // Updated node
        this.asyncRenderNode(node);
      } else if (forceRender || !prevNode) {
        // New node
        this.asyncRenderNode(node);
      }
    });
  }

  removeOldNodes(prevNodes: any, prevNodesMap: any, nodesMap: any) {
    // remove old nodes
    prevNodes.forEach((prevNode) => {
      const nodeId = prevNode.id;

      // Check for deletions
      if (!this.getNodeById(nodeId, nodesMap)) {
        const prevNodeMapNode = this.getNodeById(nodeId, prevNodesMap);
        // remove all outgoing edges
        prevNodeMapNode.outgoingEdges.forEach((edge) => {
          GraphView.removeEdgeElement(edge.source, edge.target);
        });

        // remove all incoming edges
        prevNodeMapNode.incomingEdges.forEach((edge) => {
          GraphView.removeEdgeElement(edge.source, edge.target);
        });

        // remove node
        // The timeout avoids a race condition
        setTimeout(() => {
          GraphUtils.removeElementFromDom(`node-${nodeId}-container`);
        });
      }
    });
  }

  addNewEdges(
    edges: Array<EdgeDataType>,
    oldEdgesMap: any,
    selectedEdge: any,
    prevSelectedEdge: any,
    forceRender: boolean = false,
  ) {
    const { draggingEdge } = this.state;

    if (!draggingEdge) {
      let edge = null;

      for (let i = 0; i < edges.length; i += 1) {
        edge = edges[i];
        if (!edge.source || !edge.target) {
          // eslint-disable-next-line no-continue
          continue;
        }

        const prevEdge = oldEdgesMap[`${edge.source}_${edge.target}`];
        if (forceRender || !prevEdge
            || ( // selection change
              selectedEdge !== prevSelectedEdge
              && (
                (selectedEdge.edge && edge === selectedEdge.edge)
                  || (prevSelectedEdge.edge && prevSelectedEdge.edge)
              )
            )
        ) {
          // new edge
          this.syncRenderEdge(edge, false);
        }
      }
    }
  }

  removeOldEdges = (prevEdges: Array<EdgeDataType>, edgesMap: any) => {
    // remove old edges
    prevEdges.forEach((edge: EdgeDataType) => {
      if (!edge.source || !edge.target || !edgesMap[`${edge.source}_${edge.target}`]) {
        // remove edge
        GraphView.removeEdgeElement(edge.source, edge.target);
      }
    });
  }

  deleteNode(selectedNode: INode) {
    const { nodes } = this.state;
    const { onDeleteNode } = this.props;
    const nodeId = selectedNode.id;

    // delete from local state
    const newNodesArr = nodes.filter(node => node.id !== nodeId);
    this.setState({
      componentUpToDate: false,
      hoveredNode: false,
    });

    // remove from UI
    GraphUtils.removeElementFromDom(`node-${nodeId}-container`);

    // inform consumer
    onDeleteNode(selectedNode, nodeId, newNodesArr);
  }

  deleteEdge(selectedEdge: EdgeDataType) {
    const { edges, edgesMap } = this.state;
    const { onDeleteEdge } = this.props;

    if (!selectedEdge.source || !selectedEdge.target) {
      return;
    }

    const newEdgesArr = edges.filter(edge => !(
      edge.source === selectedEdge.source
        && edge.target === selectedEdge.target
    ));

    const newEdgesMap = omit(
      edgesMap,
      `${selectedEdge.source}_${selectedEdge.target}`,
    );

    onDeleteEdge(selectedEdge, newEdgesArr);

    this.setState({
      componentUpToDate: false,
      edges: newEdgesArr,
      edgesMap: newEdgesMap,
    });
  }

  handleDelete = (selected: EdgeDataType | INode) => {
    const { canDeleteNode, canDeleteEdge, readOnly } = this.props;
    if (readOnly || !selected) {
      return;
    }

    if (!selected.source && canDeleteNode && canDeleteNode(selected)) {
      this.deleteNode(selected);
    } else if (selected.source && canDeleteEdge && canDeleteEdge(selected)) {
      this.deleteEdge(selected);
    }
  }

  handleWrapperKeydown: KeyboardEventListener = (d) => {
    const {
      selected, onUndo, onRedo, onCopySelected, onPasteSelected,
    } = this.props;
    const { focused, selectedNodeObj } = this.state;
    // Conditionally ignore keypress events on the window
    if (!focused) {
      return;
    }

    const isSpecialKeyPressed = d.metaKey || d.ctrlKey;

    switch (d.key) {
      case 'Delete':
      case 'Backspace':
        if (selectedNodeObj) {
          this.handleDelete(selectedNodeObj.node || selected);
        }
        break;
      case 'z':
        if (isSpecialKeyPressed && onUndo) {
          onUndo();
        }
        break;
      case 'y':
        if (isSpecialKeyPressed && onRedo) {
          onRedo();
        }
        break;
      case 'c':
        if (isSpecialKeyPressed && selectedNodeObj.node && onCopySelected) {
          onCopySelected();
        }
        break;
      case 'v':
        if (isSpecialKeyPressed && selectedNodeObj.node && onPasteSelected) {
          onPasteSelected();
        }
        break;
      default: break;
    }
  }

  handleEdgeSelected = (e: Event) => {
    const { edges } = this.state;
    const { onSelectEdge } = this.props;
    const { source, target } = e.target.dataset;
    const { clientX, clientY } = d3.event;

    const newState = {
      svgClicked: true,
      focused: true,
    };

    if (source && target) {
      const edge: EdgeDataType | null = this.getEdgeBySourceTarget(source, target);

      if (!edge) {
        return;
      }

      Object.assign(newState, {
        selectedEdgeObj: {
          componentUpToDate: false,
          edge: edges[edge.originalArrIndex],
        },
      });

      onSelectEdge(edges[edge.originalArrIndex], { clientX, clientY });
    }

    this.setState(newState);
  }

  // eslint-disable-next-line no-unused-vars
  handleSvgClicked = (d: any, i: any) => {
    const { event } = d3;
    const { target, shiftKey } = event;
    const { selectingNode, selectedNodeObj } = this.state;
    const { readOnly, onSelectNode, onCreateNode } = this.props;

    if (GraphView.isPartOfEdge(target)) {
      this.handleEdgeSelected(event);

      return; // If any part of the edge is clicked, return
    }

    if (selectingNode) {
      this.setState({
        focused: true,
        selectingNode: false,
        svgClicked: true,
      });
    } else {
      const previousSelection = (selectedNodeObj && selectedNodeObj.node) || null;

      // de-select the current selection
      this.setState({
        selectedNodeObj: null,
        focused: true,
        svgClicked: true,
      });

      onSelectNode(null);

      if (previousSelection) {
        this.syncRenderNode(previousSelection);
      }

      if (!readOnly && shiftKey) {
        const [x, y] = d3.mouse(target);
        onCreateNode(x, y);
      }
    }
  }

  handleDocumentClick = (event: MouseEvent) => {
    // Ignore document click if it's in the SVGElement
    if (event
      && event.target
      && event.target.ownerSVGElement != null
      && event.target.ownerSVGElement === this.graphSvg.current) {
      return;
    }

    this.setState({
      documentClicked: true,
      focused: false,
      svgClicked: false,
    });
  }

  handleNodeMove = (position: IPoint, nodeId: string, shiftKey: boolean) => {
    const { draggingEdge } = this.state;
    const { canCreateEdge, readOnly } = this.props;
    const nodeMapNode = this.getNodeById(nodeId);

    if (readOnly || !nodeMapNode) {
      return;
    }

    const { node } = nodeMapNode;

    if (!shiftKey && !draggingEdge) {
      // node moved
      node.x = position.x;
      node.y = position.y;

      // Update edges for node
      this.renderConnectedEdgesFromNode(nodeMapNode, true);
      this.asyncRenderNode(node);
    } else if ((canCreateEdge && canCreateEdge(nodeId)) || draggingEdge) {
      // render new edge
      this.syncRenderEdge({ source: nodeId, targetPosition: position });
      this.setState({ draggingEdge: true });
    }
  }

  createNewEdge() {
    const { canCreateEdge, onCreateEdge } = this.props;
    const { edgesMap, edgeEndNode, hoveredNodeData } = this.state;

    if (!hoveredNodeData) {
      return;
    }

    GraphUtils.removeElementFromDom('edge-custom-container');

    if (edgeEndNode) {
      const mapId = `${hoveredNodeData.id}_${edgeEndNode.id}`;
      if (edgesMap
        && hoveredNodeData !== edgeEndNode
        && canCreateEdge
        && canCreateEdge(hoveredNodeData, edgeEndNode)
        && !edgesMap[mapId]) {
        const edge: EdgeDataType = {
          source: hoveredNodeData.id,
          target: edgeEndNode.id,
        };

        this.setState({
          componentUpToDate: false,
          draggedEdge: null,
          draggingEdge: false,
        });

        // this syncRenderEdge will render the edge as un-selected.
        this.syncRenderEdge(edge);
        // we expect the parent website to set the selected property
        // to the new edge when it's created
        onCreateEdge(hoveredNodeData, edgeEndNode);
      } else {
        // make the system understand that the edge creation process
        // is done even though it didn't work.
        this.setState({
          edgeEndNode: null,
          draggingEdge: false,
        });
      }
    }
  }

  handleNodeUpdate = (position: any, nodeId: string, shiftKey: boolean) => {
    const { onUpdateNode, readOnly } = this.props;

    if (readOnly) {
      return;
    }

    // Detect if edge is being drawn and link to hovered node
    // This will handle a new edge
    if (shiftKey) {
      this.createNewEdge();
    } else {
      const nodeMap = this.getNodeById(nodeId);
      if (nodeMap) {
        Object.assign(nodeMap.node, position);
        onUpdateNode(nodeMap.node);
      }
    }
    // force a re-render
    this.setState({
      componentUpToDate: false,
      focused: true,
      // Setting hoveredNode to false here because the layout engine doesn't
      // fire the mouseLeave event when nodes are moved.
      hoveredNode: false,
      svgClicked: true,
    });
  }

  handleNodeMouseEnter = (event: any, data: any, hovered: boolean) => {
    const { hoveredNode, draggingEdge } = this.state;

    if (!hovered && hoveredNode && draggingEdge) {
      this.setState({
        edgeEndNode: data,
      });
    } else {
      this.setState({
        hoveredNode: true,
        hoveredNodeData: data,
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  handleNodeMouseLeave = (event: any, data: any) => {
    if (
      (d3.event && d3.event.toElement && GraphUtils.findParent(d3.event.toElement, '.node'))
      || (event && event.relatedTarget && GraphUtils.findParent(event.relatedTarget, '.node'))
      || (d3.event && d3.event.buttons === 1)
      || (event && event.buttons === 1)
    ) {
      // still within a node
      return;
    }

    if (event && event.relatedTarget) {
      if (event.relatedTarget.classList.contains('edge-overlay-path')) {
        return;
      }

      this.setState({
        hoveredNode: false,
        edgeEndNode: null,
      });
    }
  }

  handleNodeSelected = (node: INode, nodeId: string, creatingEdge: boolean) => {
    // const { selectedNodeObj } = this.state;
    // if creatingEdge then de-select nodes and select new edge instead
    // const previousSelection = (selectedNodeObj && selectedNodeObj.node) || null;
    // const previousSelectionIndex = previousSelection ? selectedNodeObj.index : -1;
    const { onSelectNode } = this.props;

    this.setState({
      componentUpToDate: false,
      selectedNodeObj: {
        nodeId,
        node,
      },
    });

    if (!creatingEdge) {
      onSelectNode(node);
    }
  }

  // One can't attach handlers to 'markers' or obtain them from the event.target
  // If the click occurs within a certain radius of edge target, assume the click
  // occurred on the arrow
  isArrowClicked(edge: EdgeDataType | null) {
    const { edgeArrowSize = 0 } = this.props;
    const { target: eventTarget } = d3.event.sourceEvent;
    if (!edge || !edge.target || eventTarget.tagName !== 'path') {
      return false; // If the handle is clicked
    }

    const source = d3.mouse(eventTarget);
    const edgeCoords = Edge.parsePathToXY(Edge.getEdgePathElement(edge, this.viewWrapper.current));

    // the arrow is clicked if the xyCoords are within edgeArrowSize of edgeCoords.target[x,y]
    return (
      source.x < edgeCoords.target.x + edgeArrowSize
      && source.x > edgeCoords.target.x - edgeArrowSize
      && source.y < edgeCoords.target.y + edgeArrowSize
      && source.y > edgeCoords.target.y - edgeArrowSize
    );
  }

  handleZoomStart = () => {
    // Zoom start events also handle edge clicks. We need to determine if an edge
    // was clicked and deal with that scenario.
    const { sourceEvent } = d3.event;
    const { edgesMap } = this.state;
    const { readOnly } = this.props;

    if (
      // graph can't be modified
      readOnly
      // no sourceEvent, not an action on an element
      || !sourceEvent
      // not a click event
      || (sourceEvent && !sourceEvent.buttons)
      // not an edge click area
      || (sourceEvent && !sourceEvent.target.classList.contains('edge-overlay-path'))
    ) {
      return;
    }

    // Clicked on the edge.
    const { id: edgeId } = sourceEvent.target;
    const edge = edgesMap && edgesMap[edgeId] ? edgesMap[edgeId].edge : null;

    // Only move edges if the arrow is dragged
    if (!this.isArrowClicked(edge) || !edge) {
      return;
    }

    GraphView.removeEdgeElement(edge.source, edge.target);
    this.setState({
      draggingEdge: true,
      draggedEdge: edge,
    });
    this.dragEdge(edge);
  }

  getMouseCoordinates() {
    const mouseCoordinates = {
      x: 0,
      y: 0,
    };

    if (this.selectedView) {
      const [x, y] = d3.mouse(this.selectedView.node());

      mouseCoordinates.x = x;
      mouseCoordinates.y = y;
    }

    return mouseCoordinates;
  }

  dragEdge(draggedEdge?: EdgeDataType) {
    const { draggedEdge: draggedEdgeState } = this.state;

    draggedEdge = draggedEdge || draggedEdgeState;

    if (!draggedEdge) {
      return;
    }

    const targetPosition = this.getMouseCoordinates();
    const offset = Edge.calculateOffset(
      this.getNodeById(draggedEdge.source).node,
      targetPosition,
    );

    targetPosition.x += offset.xOff;
    targetPosition.y += offset.yOff;

    this.syncRenderEdge({
      source: draggedEdge.source,
      targetPosition,
    });

    this.setState({
      draggedEdge,
      draggingEdge: true,
    });
  }

  // View 'zoom' handler
  handleZoom = () => {
    const { draggingEdge, viewTransform } = this.state;
    const { transform } = d3.event;

    if (!draggingEdge) {
      d3.select(this.view).attr('transform', transform);

      // prevent re-rendering on zoom
      if (viewTransform !== transform) {
        this.setState({
          viewTransform: transform,
          draggedEdge: null,
          draggingEdge: false,
        }, () => {
          // force the child components which are related to zoom level to update
          this.renderGraphControls();
        });
      }
    } else if (draggingEdge) {
      this.dragEdge();
    }
  }

  handleZoomEnd = () => {
    const { draggingEdge, draggedEdge, edgeEndNode } = this.state;
    const { onSwapEdge } = this.props;

    if (!draggingEdge || !draggedEdge) {
      if (draggingEdge && !draggedEdge) {
        // This is a bad case, sometimes when the graph loses focus while an edge
        // is being created it doesn't set draggingEdge to false. This fixes that case.
        this.setState({ draggingEdge: false });
      }

      return;
    }

    // Zoom start events also handle edge clicks. We need to determine if an edge
    // was clicked and deal with that scenario.
    const draggedEdgeCopy = { ...draggedEdge };

    // remove custom edge
    GraphUtils.removeElementFromDom('edge-custom-container');
    this.setState({
      draggedEdge: null,
      draggingEdge: false,
      hoveredNode: false,
    }, () => {
      // handle creating or swapping edges
      const sourceNodeById = this.getNodeById(draggedEdge.source);
      const targetNodeById = this.getNodeById(draggedEdge.target);

      if (!sourceNodeById || !targetNodeById) {
        return;
      }

      if (edgeEndNode
        && !this.getEdgeBySourceTarget(draggedEdge.source, edgeEndNode.id)
        && GraphView.canSwap(sourceNodeById.node, edgeEndNode, draggedEdge)) {
        // determine the target node and update the edge
        draggedEdgeCopy.target = edgeEndNode.id;
        this.syncRenderEdge(draggedEdgeCopy);
        onSwapEdge(
          sourceNodeById.node,
          edgeEndNode,
          draggedEdge,
        );
      } else {
        // this resets the dragged edge back to its original position.
        this.syncRenderEdge(draggedEdge);
      }
    });
  }

  // Zooms to contents of this.refs.entities
  handleZoomToFit = () => {
    const { minZoom = 0, maxZoom = 2, zoomDur } = this.props;
    const { clientWidth: width, clientHeight: height } = d3.select(this.viewWrapper.current).node();

    const entities = d3.select(this.entities).node();
    const viewBBox = entities.getBBox && entities.getBBox();

    if (!viewBBox) {
      return;
    }

    const next = {
      k: (minZoom + maxZoom) / 2,
      x: 0,
      y: 0,
    };

    if (viewBBox.width > 0 && viewBBox.height > 0) {
      // There are entities
      const dx = viewBBox.width;
      const dy = viewBBox.height;
      const x = viewBBox.x + dx / 2;
      const y = viewBBox.y + dy / 2;

      next.k = 0.9 / Math.max(dx / width, dy / height);

      if (next.k < minZoom) {
        next.k = minZoom;
      } else if (next.k > maxZoom) {
        next.k = maxZoom;
      }

      next.x = width / 2 - next.k * x;
      next.y = height / 2 - next.k * y;
    }

    this.setZoom(next.k, next.x, next.y, zoomDur);
  }

  // Updates current viewTransform with some delta
  modifyZoom = (modK: number = 0, modX: number = 0, modY: number = 0, dur: number = 0) => {
    const { viewTransform } = this.state;
    const { clientWidth: width, clientHeight: height } = d3.select(this.viewWrapper.current).node();
    const center = {
      x: width / 2,
      y: height / 2,
    };

    const next = {
      k: viewTransform.k,
      x: viewTransform.x,
      y: viewTransform.y,
    };

    const targetZoom = next.k * (1 + modK);
    next.k = targetZoom;

    const extent = this.zoom.scaleExtent();
    if (targetZoom < extent[0] || targetZoom > extent[1]) {
      return;
    }

    const translate0 = {
      x: (center.x - next.x) / next.k,
      y: (center.y - next.y) / next.k,
    };

    const l = {
      x: translate0.x * next.k + next.x,
      y: translate0.y * next.k + next.y,
    };

    next.x += center.x - l.x + modX;
    next.y += center.y - l.y + modY;

    this.setZoom(next.k, next.x, next.y, dur);
  }

  // Programmatically resets zoom
  setZoom(k: number = 1, x: number = 0, y: number = 0, dur: number = 0) {
    const t = d3.zoomIdentity.translate(x, y).scale(k);

    d3
      .select(this.viewWrapper.current)
      .select('svg')
      .transition()
      .duration(dur)
      .call(this.zoom.transform, t);
  }

  // Renders 'graph' into view element
  renderView() {
    const { viewTransform } = this.state;

    // Update the view w/ new zoom/pan
    this.selectedView.attr('transform', viewTransform);

    clearTimeout(this.renderNodesTimeout);
    this.renderNodesTimeout = setTimeout(this.renderNodes);
  }

  renderBackground = () => {
    const { gridSize, backgroundFillId, renderBackground } = this.props;

    if (renderBackground) {
      return renderBackground(gridSize);
    }

    return (
      <Background
        gridSize={gridSize}
        backgroundFillId={backgroundFillId}
      />
    );
  }

  getNodeComponent(id: string, node: INode) {
    const { selectedNodeObj } = this.state;
    const {
      ACTION_SAVE_MAP_TO_UNDO, onCreateNodeWithEdge, onCollapseNode, onLockNode, onResizeNode,
    } = this.props;

    return (
      <Node
        key={id}
        id={id}
        data={node}
        onNodeMouseEnter={this.handleNodeMouseEnter}
        onNodeMouseLeave={this.handleNodeMouseLeave}
        onNodeMove={this.handleNodeMove}
        onNodeUpdate={this.handleNodeUpdate}
        onNodeSelected={this.handleNodeSelected}
        onNodeCollapsed={onCollapseNode}
        onNodeResize={onResizeNode}
        onNodeLocked={onLockNode}
        onCreateNodeWithEdge={onCreateNodeWithEdge}
        isSelected={selectedNodeObj.node === node}
        layoutEngine={this.layoutEngine}
        viewWrapperElem={this.viewWrapper.current}
        ACTION_SAVE_MAP_TO_UNDO={ACTION_SAVE_MAP_TO_UNDO}
      />
    );
  }

  renderNode = (id: string, element: React.Element) => {
    if (!this.entities) {
      return;
    }

    const containerId = `${id}-container`;
    let nodeContainer = document.getElementById(containerId);

    if (!nodeContainer) {
      nodeContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      nodeContainer.id = containerId;

      this.entities.appendChild(nodeContainer);
    }

    // ReactDOM.render replaces the insides of an element This renders the element
    // into the nodeContainer
    ReactDOM.render(element, nodeContainer);
  }

  renderConnectedEdgesFromNode(node: INodeMapNode, nodeMoving: boolean = false) {
    const { draggingEdge } = this.state;

    if (draggingEdge) {
      return;
    }

    node.incomingEdges
      .forEach(edge => this.asyncRenderEdge(edge, nodeMoving));
    node.outgoingEdges
      .forEach(edge => this.asyncRenderEdge(edge, nodeMoving));
  }

  asyncRenderNode(node: INode) {
    const timeoutId = `nodes-${node.id}`;
    cancelAnimationFrame(this.nodeTimeouts[timeoutId]);

    this.nodeTimeouts[timeoutId] = requestAnimationFrame(() => {
      this.syncRenderNode(node);
    });
  }

  syncRenderNode(node: INode) {
    const id = `node-${node.id}`;
    const element: any = this.getNodeComponent(id, node);
    const nodesMapNode = this.getNodeById(node.id);
    if (nodesMapNode) {
      this.renderConnectedEdgesFromNode(nodesMapNode);
    }
    this.renderNode(id, element);
  }

  renderNodes = () => {
    if (!this.entities) {
      return;
    }

    const { nodes } = this.state;

    nodes.forEach(node => this.asyncRenderNode(node));
  }

  isEdgeSelected = (edge: EdgeDataType) => {
    const { selectedEdgeObj } = this.state;

    return !!selectedEdgeObj
      && !!selectedEdgeObj.edge
      && selectedEdgeObj.edge.source === edge.source
      && selectedEdgeObj.edge.target === edge.target;
  }

  getEdgeComponent = (edge: EdgeDataType | any) => {
    const { edgeTypes, edgeHandleSize } = this.props;
    const sourceNodeMapNode = this.getNodeById(edge.source);
    const sourceNode = sourceNodeMapNode ? sourceNodeMapNode.node : null;
    const targetNodeMapNode = this.getNodeById(edge.target);
    const targetNode = targetNodeMapNode ? targetNodeMapNode.node : null;

    return (
      <Edge
        data={edge}
        edgeTypes={edgeTypes}
        edgeHandleSize={edgeHandleSize}
        sourceNode={sourceNode}
        targetNode={targetNode || edge.targetPosition}
        viewWrapperElem={this.viewWrapper.current}
        isSelected={this.isEdgeSelected(edge)}
        hasSibling={this.checkIfEdgeHasSibling(edge)}
      />
    );
  }

  checkIfEdgeHasSibling = (edge: EdgeDataType | any) => {
    const { edges } = this.props;
    const { source: edgeSource, target: edgeTarget } = edge;

    return edges.some(({ source, target }) => source === edgeTarget && target === edgeSource);
  }

  renderEdge(id: string, element: any, edge: EdgeDataType, nodeMoving: boolean = false) {
    if (!this.entities) {
      return;
    }

    const { draggedEdge } = this.state;
    const { afterRenderEdge } = this.props;

    let containerId = `${id}-container`;
    const customContainerId = `${id}-custom-container`;
    let edgeContainer = document.getElementById(containerId);

    if (nodeMoving && edgeContainer) {
      edgeContainer.style.display = 'none';
      containerId = `${id}-custom-container`;
      edgeContainer = document.getElementById(containerId);
    } else if (edgeContainer) {
      const customContainer = document.getElementById(customContainerId);
      edgeContainer.style.display = '';
      if (customContainer) {
        customContainer.remove();
      }
    }

    if (!edgeContainer && edge !== draggedEdge) {
      const newSvgEdgeContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      newSvgEdgeContainer.id = containerId;
      if (this.entities.firstChild) {
        this.entities.insertBefore(newSvgEdgeContainer, this.entities.firstChild);
      } else {
        this.entities.appendChild(newSvgEdgeContainer);
      }
      edgeContainer = newSvgEdgeContainer;
    }

    // ReactDOM.render replaces the insides of an element This renders the element
    // into the edgeContainer
    if (edgeContainer) {
      ReactDOM.render(element, edgeContainer);
      if (afterRenderEdge) {
        afterRenderEdge(id, element, edge, edgeContainer, this.isEdgeSelected(edge));
      }
    }
  }

  asyncRenderEdge = (edge: EdgeDataType, nodeMoving: boolean = false) => {
    if (!edge.source || !edge.target) {
      return;
    }

    const timeoutId = `edges-${edge.source}-${edge.target}`;
    cancelAnimationFrame(this.edgeTimeouts[timeoutId]);

    this.edgeTimeouts[timeoutId] = requestAnimationFrame(() => {
      this.syncRenderEdge(edge, nodeMoving);
    });
  }

  syncRenderEdge(edge: EdgeDataType | any, nodeMoving: boolean = false) {
    if (!edge.source) {
      return;
    }

    // We have to use the 'custom' id when we're drawing a new node
    const idVar = edge.target ? `${edge.source}-${edge.target}` : 'custom';
    const id = `edge-${idVar}`;
    const element = this.getEdgeComponent(edge);
    this.renderEdge(id, element, edge, nodeMoving);
  }

  renderEdges = () => {
    const { edges, draggingEdge } = this.state;

    if (!this.entities || draggingEdge) {
      return;
    }

    edges.forEach(edge => this.asyncRenderEdge(edge));
  }

  /*
   * ZoomControls is a special child component. To maximize responsiveness we disable
   * rendering on zoom level changes, but this component still needs to update.
   * This function ensures that it updates into the container quickly upon zoom changes
   * without causing a full GraphView render.
   */
  renderGraphControls() {
    const { viewTransform } = this.state;
    const { minZoom, maxZoom, zoomControlsRef } = this.props;

    const zoomRefs = zoomControlsRef.current;

    if (zoomRefs) {
      ReactDOM.render(
        <ZoomControls
          minZoom={minZoom}
          maxZoom={maxZoom}
          zoomLevel={viewTransform ? viewTransform.k : 1}
          zoomToFit={this.handleZoomToFit}
          modifyZoom={this.modifyZoom}
        />,
        zoomRefs,
      );
    }
  }

  layoutEngine: any;

  nodeTimeouts: any;

  edgeTimeouts: any;

  renderNodesTimeout: any;

  renderEdgesTimeout: any;

  zoom: any;

  viewWrapper: React.RefObject<HTMLDivElement>;

  graphSvg: React.RefObject<SVGElement>;

  entities: any;

  selectedView: any;

  view: any;

  render() {
    const {
      edgeArrowSize, gridSpacing, gridDotSize, edgeTypes, renderDefs,
    } = this.props;
    return (
      <ViewWrapper ref={this.viewWrapper}>
        <GraphWrapper ref={this.graphSvg}>
          <Defs
            edgeArrowSize={edgeArrowSize}
            gridSpacing={gridSpacing}
            gridDotSize={gridDotSize}
            edgeTypes={edgeTypes}
            renderDefs={renderDefs}
          />
          <g ref={(el) => { this.view = el; }}>
            {this.renderBackground()}

            <g ref={(el) => { this.entities = el; }} />
          </g>
        </GraphWrapper>
      </ViewWrapper>
    );
  }
}

const mapStateToProps = ({ constructor: { zoom } }) => ({
  zoomControlsRef: zoom.zoomControlsRef,
});

const mapDispatchToProps = dispatch => ({
  ACTION_SAVE_MAP_TO_UNDO: () => {
    dispatch(actions.ACTION_SAVE_MAP_TO_UNDO());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphView);
