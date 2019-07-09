// @flow
/*
  This component is used as wrapper above GraphView.
  It provides necessary methods into its child.
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';

import GraphView from './GraphView';

import { createNewEdge, createNewNode } from './utils';
import { EDGE_TYPES, NODE_CREATION_OFFSET } from './config';
import { DND_CONTEXTS, MODALS_NAMES } from '../../Modals/config';

import * as graphActions from '../../reducers/map/action';
import * as modalActions from '../../Modals/action';

import type { IGraphProps, IGraphState } from './types';
import type { Edge as EdgeType } from './Edge/types';
import type { Node as NodeType } from './Node/types';

import { Wrapper } from './styles';

export class Graph extends Component<IGraphProps, IGraphState> {
  constructor(props: IGraphProps) {
    super(props);

    this.graphViewRef = React.createRef();
    this.graphViewWrapperRef = React.createRef();
  }

  componentDidMount() {
    const { connectDropTarget } = this.props;
    const { current: graphViewWrapperRef } = this.graphViewWrapperRef;

    connectDropTarget(graphViewWrapperRef);
  }

  get getSelectedItem(): NodeType | EdgeType | null {
    const nodeItem = this.getSelectedNode;
    if (nodeItem) {
      return nodeItem;
    }

    const edgeItem = this.getSelectedEdge;
    if (edgeItem) {
      return edgeItem;
    }

    return null;
  }

  get getSelectedNode(): NodeType | null {
    const { map: { nodes } } = this.props;

    return nodes.find(node => node.isSelected) || null;
  }

  get getSelectedEdge(): EdgeType | null {
    const { map: { edges } } = this.props;

    return edges.find(edge => edge.isSelected) || null;
  }

  onSelectNode = (item: NodeType | null, clientX?: number = 0, clientY?: number = 0) => {
    const itemId = item ? item.id : null;
    const {
      ACTION_SELECT_ITEM,
      ACTION_SET_POSITION_MODAL,
    } = this.props;

    if (item) {
      ACTION_SET_POSITION_MODAL(MODALS_NAMES.NODE_EDITOR_MODAL, clientX, clientY);
    }

    ACTION_SELECT_ITEM(itemId);
  };

  onSelectEdge = (item: EdgeType | null, clientX?: number = 0, clientY?: number = 0) => {
    const itemId = item ? item.id : null;
    const {
      ACTION_SELECT_ITEM,
      ACTION_SET_POSITION_MODAL,
    } = this.props;

    if (item) {
      ACTION_SET_POSITION_MODAL(MODALS_NAMES.LINK_EDITOR_MODAL, clientX, clientY);
    }

    ACTION_SELECT_ITEM(itemId);
  };

  onCollapseNode = (nodeId: number) => {
    const { ACTION_UPDATE_NODE_COLLAPSE } = this.props;
    ACTION_UPDATE_NODE_COLLAPSE(nodeId);
  };

  onResizeNode = (nodeId: number, width: number, height: number) => {
    const { ACTION_UPDATE_NODE_RESIZE } = this.props;
    ACTION_UPDATE_NODE_RESIZE(nodeId, width, height);
  }

  onLockNode = (nodeId: number) => {
    const { ACTION_UPDATE_NODE_LOCK } = this.props;
    ACTION_UPDATE_NODE_LOCK(nodeId);
  };

  onCreateNode = (x: number, y: number) => {
    const { map, defaults: { nodeBody }, ACTION_CREATE_NODE } = this.props;
    const newNode = createNewNode(map.id, x, y, nodeBody);

    ACTION_CREATE_NODE(newNode);
  }

  onCreateEdge = (sourceNode: NodeType, targetNode: NodeType) => {
    if (sourceNode.id === targetNode.id) {
      return;
    }

    const { defaults: { edgeBody }, ACTION_CREATE_EDGE } = this.props;
    const newEdge = createNewEdge(sourceNode.id, targetNode.id, edgeBody);

    ACTION_CREATE_EDGE(newEdge);
  }

  onCreateNodeWithEdge = (x: number, y: number, sourceNode: NodeType) => {
    const {
      map, defaults: { edgeBody, nodeBody }, ACTION_CREATE_NODE_WITH_EDGE,
    } = this.props;

    const newNode = createNewNode(map.id, x, y, nodeBody);
    const newEdge = createNewEdge(sourceNode.id, newNode.id, edgeBody);

    ACTION_CREATE_NODE_WITH_EDGE(newNode, newEdge, sourceNode.id);
  }

  onUpdateNode = (node: NodeType) => {
    const { ACTION_UPDATE_NODE } = this.props;
    ACTION_UPDATE_NODE(node);
  }

  onDeleteNode = (nodeId: number) => {
    const { ACTION_DELETE_NODE } = this.props;
    ACTION_DELETE_NODE(nodeId);
  }

  onDeleteEdge = (edge: EdgeType) => {
    const { ACTION_DELETE_EDGE } = this.props;
    ACTION_DELETE_EDGE(edge.id, edge.source);
  }

  onUndo = () => {
    const { ACTION_UNDO_MAP, isUndoAvailable } = this.props;

    if (!isUndoAvailable) {
      return;
    }

    ACTION_UNDO_MAP();
  }

  onRedo = () => {
    const { ACTION_REDO_MAP, isRedoAvailable } = this.props;

    if (!isRedoAvailable) {
      return;
    }

    ACTION_REDO_MAP();
  }

  onCopySelected = () => {
    const selectedNode = this.getSelectedNode;

    if (!selectedNode) {
      return;
    }

    const x = selectedNode.x + NODE_CREATION_OFFSET;
    const y = selectedNode.y + NODE_CREATION_OFFSET;

    this.setState({
      copiedNode: {
        ...selectedNode,
        x,
        y,
      },
    });
  }

  onPasteSelected = () => {
    const { ACTION_CREATE_NODE } = this.props;

    const { copiedNode } = this.state;
    const newNodeId = Date.now();
    const newNode = {
      ...copiedNode,
      id: newNodeId,
    };

    ACTION_CREATE_NODE(newNode);
  }

  graphViewWrapperRef: { current: null | HTMLDivElement };

  graphViewRef: { current: null | HTMLDivElement };

  render() {
    const {
      isFullScreen, map: { nodes, edges }, minZoom, maxZoom, layoutEngineType,
    } = this.props;

    return (
      <Wrapper
        id="graph"
        ref={this.graphViewWrapperRef}
        isFullScreen={isFullScreen}
      >
        <GraphView
          ref={this.graphViewRef}
          minZoom={minZoom / 100}
          maxZoom={maxZoom / 100}
          nodes={nodes}
          edges={edges}
          selected={this.getSelectedItem}
          edgeTypes={EDGE_TYPES}
          onSelectNode={this.onSelectNode}
          onCreateNode={this.onCreateNode}
          onCollapseNode={this.onCollapseNode}
          onLockNode={this.onLockNode}
          onResizeNode={this.onResizeNode}
          onUpdateNode={this.onUpdateNode}
          onDeleteNode={this.onDeleteNode}
          onSelectEdge={this.onSelectEdge}
          onCreateEdge={this.onCreateEdge}
          onDeleteEdge={this.onDeleteEdge}
          onUndo={this.onUndo}
          onRedo={this.onRedo}
          onCopySelected={this.onCopySelected}
          onPasteSelected={this.onPasteSelected}
          onCreateNodeWithEdge={this.onCreateNodeWithEdge}
          layoutEngineType={layoutEngineType}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ map, defaults, constructor }) => ({
  map,
  defaults,
  minZoom: constructor.zoom.minZoom,
  maxZoom: constructor.zoom.maxZoom,
  isUndoAvailable: !!map.undo.length,
  isRedoAvailable: !!map.redo.length,
  layoutEngineType: constructor.layoutEngineType,
  isFullScreen: constructor.isFullScreen,
});

const mapDispatchToProps = dispatch => ({
  ACTION_DELETE_EDGE: (edgeId: number, nodeId: number) => {
    dispatch(graphActions.ACTION_DELETE_EDGE(edgeId, nodeId));
  },
  ACTION_CREATE_EDGE: (edgeData: EdgeType) => {
    dispatch(graphActions.ACTION_CREATE_EDGE(edgeData));
  },
  ACTION_DELETE_NODE: (nodeId: number) => {
    dispatch(graphActions.ACTION_DELETE_NODE(nodeId));
  },
  ACTION_UPDATE_NODE: (nodeData: NodeType) => {
    dispatch(graphActions.ACTION_UPDATE_NODE(nodeData));
  },
  ACTION_CREATE_NODE: (nodeData: NodeType) => {
    dispatch(graphActions.ACTION_CREATE_NODE(nodeData));
  },
  ACTION_CREATE_NODE_WITH_EDGE: (nodeData: NodeType, edgeData: EdgeType, sourceNodeId: number) => {
    dispatch(graphActions.ACTION_CREATE_NODE_WITH_EDGE(nodeData, edgeData, sourceNodeId));
  },
  ACTION_SELECT_ITEM: (id: number) => {
    dispatch(graphActions.ACTION_SELECT_ITEM(id));
  },
  ACTION_UPDATE_NODE_COLLAPSE: (nodeId: number) => {
    dispatch(graphActions.ACTION_UPDATE_NODE_COLLAPSE(nodeId));
  },
  ACTION_UPDATE_NODE_RESIZE: (nodeId: number, width: number, height: number) => {
    dispatch(graphActions.ACTION_UPDATE_NODE_RESIZE(nodeId, width, height));
  },
  ACTION_UPDATE_NODE_LOCK: (nodeId: number) => {
    dispatch(graphActions.ACTION_UPDATE_NODE_LOCK(nodeId));
  },
  ACTION_SET_POSITION_MODAL: (modalName: string, x: number, y: number) => {
    dispatch(modalActions.ACTION_SET_POSITION_MODAL(modalName, x, y));
  },
  ACTION_REDO_MAP: () => {
    dispatch(graphActions.ACTION_REDO_MAP());
  },
  ACTION_UNDO_MAP: () => {
    dispatch(graphActions.ACTION_UNDO_MAP());
  },
});

/*
  It describes how the drop target reacts to the drag and drop events.
  See docs here: http://react-dnd.github.io/react-dnd/docs/api/drop-target#parameters
*/
const spec = {
  drop: (props, monitor, component) => {
    if (!component) {
      return null;
    }

    return monitor.getDifferenceFromInitialOffset();
  },
};

/*
  It should return a plain object of the props to inject into your component.
  It receives two parameters: connect and monitor.
  See docs here: http://react-dnd.github.io/react-dnd/docs/api/drop-target#parameters
*/
const collect = conn => ({
  connectDropTarget: conn.dropTarget(),
});

export default DropTarget(
  DND_CONTEXTS.VIEWPORT,
  spec,
  collect,
)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true },
  )(Graph),
);
