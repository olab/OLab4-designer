// @flow
/*
  This component is used as wrapper above GraphView.
  It provides necessary methods into its child.
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import isEqual from 'lodash.isequal';

import GraphView from './GraphView';
import type { EdgeData as EdgeDataType } from './Edge/types';
import type { INode } from './Node/types';
import type {
  IGraphProps,
  IGraphState,
} from './types';
import type {
  Edge as EdgeType,
  Node as NodeType,
  NodeData as NodeDataType,
} from '../../reducers/map/types';

import { createNewEdge, createNewNode } from './utils';
import { EdgeTypes } from './config';
import { DndContexts, ModalsNames } from '../../Modals/config';

import * as graphActions from '../../reducers/map/action';
import * as modalActions from '../../Modals/action';

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

  get getSelectedItem(): NodeDataType | EdgeDataType | null {
    const nodeItem = this.getSelectedNode;
    if (nodeItem) {
      return nodeItem.data;
    }

    const edgeItem = this.getSelectedEdge;

    if (edgeItem) {
      return edgeItem.data;
    }

    return null;
  }

  get getSelectedNode(): NodeType | null {
    const { graph } = this.props;

    return graph.nodes.find(node => node.isSelected) || null;
  }

  get getSelectedEdge(): EdgeType | null {
    const { graph } = this.props;

    return graph.edges.find(edge => edge.isSelected) || null;
  }

  onSelectNode = (item: INode | null) => {
    const itemId = item ? item.id : null;
    const { ACTION_SELECT_ITEM } = this.props;

    ACTION_SELECT_ITEM(itemId);
  };

  onSelectEdge = (
    item: EdgeDataType | null,
    { clientX, clientY }: { clientX: number, clientY: number },
  ) => {
    const itemId = item ? item.id : null;

    const {
      ACTION_SELECT_ITEM,
      ACTION_SET_POSITION_LINK_EDITOR_MODAL,
    } = this.props;

    ACTION_SET_POSITION_LINK_EDITOR_MODAL(clientX, clientY);
    ACTION_SELECT_ITEM(itemId);
  };

  onCollapseItem = (id: number, width: number, height: number) => {
    const { ACTION_COLLAPSE_NODE } = this.props;
    ACTION_COLLAPSE_NODE(id, width, height);
  };

  onResizeNode = (id: number, width: number, height: number) => {
    const { ACTION_RESIZE_NODE } = this.props;
    ACTION_RESIZE_NODE(id, width, height);
  }

  onLockNode = (id: number) => {
    const { ACTION_LOCK_NODE } = this.props;
    ACTION_LOCK_NODE(id);
  };

  onCreateNode = (x: number, y: number) => {
    const { ACTION_CREATE_NODE } = this.props;
    const newNode = createNewNode(x, y);

    ACTION_CREATE_NODE(newNode);
  }

  onCreateEdge = (sourceNode: INode, targetNode: INode) => {
    if (sourceNode.id === targetNode.id) {
      return;
    }

    const { ACTION_CREATE_EDGE } = this.props;

    const newEdge = createNewEdge(sourceNode.id, targetNode.id);

    ACTION_CREATE_EDGE(newEdge);
  }

  onCreateNodeWithEdge = (x: number, y: number, sourceNode: INode) => {
    const { ACTION_CREATE_NODE_WITH_EDGE } = this.props;

    const newNode = createNewNode(x, y);
    const newEdge = createNewEdge(sourceNode.id, newNode.id);

    ACTION_CREATE_NODE_WITH_EDGE(newNode, newEdge);
  }

  onUpdateNode = (node: INode) => {
    const { graph, ACTION_UPDATE_NODE } = this.props;
    const foundNode = graph.nodes.find(({ data }) => data.id === node.id);

    if (foundNode && !isEqual(foundNode.data, node)) {
      ACTION_UPDATE_NODE(node);
    }
  }

  onDeleteNode = (node: INode) => {
    const { ACTION_DELETE_NODE } = this.props;
    ACTION_DELETE_NODE(node.id);
  }

  onDeleteEdge = (edge: EdgeDataType) => {
    const { ACTION_DELETE_EDGE } = this.props;
    ACTION_DELETE_EDGE(edge.id);
  }

  onSwapEdge = (sourceNode: INode, targetNode: INode, edge: EdgeDataType) => {
    const { ACTION_SWAP_EDGE } = this.props;
    ACTION_SWAP_EDGE(edge.id, sourceNode.id, targetNode.id);
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

    const x = selectedNode.data.x + 10;
    const y = selectedNode.data.y + 10;

    this.setState({
      copiedNode: {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          x,
          y,
        },
      },
    });
  }

  onPasteSelected = () => {
    const { ACTION_CREATE_NODE } = this.props;

    const { copiedNode } = this.state;
    const newNodeId = Date.now();
    const newNode = {
      ...copiedNode,
      data: {
        ...copiedNode.data,
        id: newNodeId,
        links: [],
      },
    };

    ACTION_CREATE_NODE(newNode);
  }

  graphViewWrapperRef: { current: null | HTMLDivElement };

  graphViewRef: { current: null | HTMLDivElement };

  render() {
    const {
      isFullScreen, graph, minZoom, maxZoom, layoutEngineType,
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
          nodes={graph.nodes.map(({ data }) => data)}
          edges={graph.edges.map(({ data }) => data)}
          selected={this.getSelectedItem}
          edgeTypes={EdgeTypes}
          onSelectNode={this.onSelectNode}
          onCreateNode={this.onCreateNode}
          onCollapseNode={this.onCollapseItem}
          onLockNode={this.onLockNode}
          onResizeNode={this.onResizeNode}
          onUpdateNode={this.onUpdateNode}
          onDeleteNode={this.onDeleteNode}
          onSelectEdge={this.onSelectEdge}
          onCreateEdge={this.onCreateEdge}
          onSwapEdge={this.onSwapEdge}
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

const mapStateToProps = ({
  map: {
    nodes, edges, undo, redo,
  },
  constructor: { zoom, layoutEngineType },
}) => ({
  minZoom: zoom.minZoom,
  maxZoom: zoom.maxZoom,
  graph: { nodes, edges },
  layoutEngineType,
  isUndoAvailable: !!undo.length,
  isRedoAvailable: !!redo.length,
});

const mapDispatchToProps = dispatch => ({
  ACTION_SWAP_EDGE: (edgeId: number, sourceNodeId: number, targetNodeId: number) => {
    dispatch(graphActions.ACTION_SWAP_EDGE(edgeId, sourceNodeId, targetNodeId));
  },
  ACTION_DELETE_EDGE: (edgeId: number) => {
    dispatch(graphActions.ACTION_DELETE_EDGE(edgeId));
  },
  ACTION_CREATE_EDGE: (edgeData: EdgeType) => {
    dispatch(graphActions.ACTION_CREATE_EDGE(edgeData));
  },
  ACTION_DELETE_NODE: (nodeId: number) => {
    dispatch(graphActions.ACTION_DELETE_NODE(nodeId));
  },
  ACTION_UPDATE_NODE: (nodeData: INode) => {
    dispatch(graphActions.ACTION_UPDATE_NODE(nodeData));
  },
  ACTION_CREATE_NODE: (nodeData: NodeType) => {
    dispatch(graphActions.ACTION_CREATE_NODE(nodeData));
  },
  ACTION_CREATE_NODE_WITH_EDGE: (nodeData: NodeType, edgeData: EdgeType) => {
    dispatch(graphActions.ACTION_CREATE_NODE_WITH_EDGE(nodeData, edgeData));
  },
  ACTION_SELECT_ITEM: (id: number) => {
    dispatch(graphActions.ACTION_SELECT_ITEM(id));
  },
  ACTION_COLLAPSE_NODE: (id: number, width: number, height: number) => {
    dispatch(graphActions.ACTION_COLLAPSE_NODE(id, width, height));
  },
  ACTION_RESIZE_NODE: (id: number, width: number, height: number) => {
    dispatch(graphActions.ACTION_RESIZE_NODE(id, width, height));
  },
  ACTION_LOCK_NODE: (id: number) => {
    dispatch(graphActions.ACTION_LOCK_NODE(id));
  },
  ACTION_SET_POSITION_LINK_EDITOR_MODAL: (x: number, y: number) => {
    dispatch(modalActions.ACTION_SET_POSITION_MODAL(
      ModalsNames.LINK_EDITOR_MODAL,
      x,
      y,
    ));
  },
  ACTION_REDO_MAP: () => {
    dispatch(graphActions.ACTION_REDO_MAP());
  },
  ACTION_UNDO_MAP: () => {
    dispatch(graphActions.ACTION_UNDO_MAP());
  },
  ACTION_RESET_MAP: () => {
    dispatch(graphActions.ACTION_RESET_MAP());
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
  DndContexts.VIEWPORT,
  spec,
  collect,
)(connect(mapStateToProps, mapDispatchToProps)(Graph));
