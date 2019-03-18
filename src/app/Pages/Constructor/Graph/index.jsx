// @flow

// debugger; // eslint-disable-line

import React, { Component } from 'react';
import { connect } from 'react-redux';
import randomColor from 'randomcolor';
import classNames from 'classnames';

import {
  GraphView,
  type IEdgeType as IEdge,
  type INodeType as INode, // BwdlTransformer,
} from 'react-digraph';

import type {
  IGraphProps,
  IGraphState,
} from './types';

import type {
  Edge as EdgeType,
  Node as NodeType,
  NodeData as NodeDataType,
  EdgeData as EdgeDataType,
} from '../../../../types';

import GraphConfig from './config';

import * as actions from './action';

import './graph.scss';

class Graph extends Component<IGraphProps, IGraphState> {
  constructor(props: any) {
    super(props);
    this.state = {
      layoutEngineType: 'VerticalTree',
    };

    this.GraphView = React.createRef();
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

  onSelectItem = (item: INode | IEdge | null) => {
    const itemId = item ? item.id : null;

    const { ACTION_SELECT_ITEM } = this.props;
    ACTION_SELECT_ITEM(itemId);
  };

  onCreateNode = (x: number, y: number) => {
    const { ACTION_CREATE_NODE } = this.props;

    const newNodeId = Date.now();
    const newNodeMapId = Number(newNodeId.toString().slice(0, 6));
    const newNode = {
      isSelected: true,
      expand: false,
      locked: false,
      data: {
        id: newNodeId,
        map_id: newNodeMapId,
        title: `New Node - (${newNodeId})`,
        type_id: newNodeMapId,
        color: randomColor(),
        text: 'Dummy Text',
        links: [],
        destination_id: newNodeMapId,
        style_id: newNodeMapId,
        x,
        y,
      },
    };

    ACTION_CREATE_NODE(newNode);
  }

  onCreateEdge = (sourceNode: INode, targetNode: INode) => {
    if (sourceNode.id === targetNode.id) {
      return;
    }

    const { ACTION_CREATE_EDGE } = this.props;

    const newEdgeId = Date.now();
    const newEdge = {
      isSelected: true,
      data: {
        id: newEdgeId,
        handleText: `Arrow-${newEdgeId}`,
        source: sourceNode.id,
        target: targetNode.id,
      },
    };

    ACTION_CREATE_EDGE(newEdge);
  }

  onUpdateNode = (node: INode) => {
    const { ACTION_UPDATE_NODE } = this.props;
    ACTION_UPDATE_NODE(node);
  }

  onDeleteNode = (node: INode) => {
    const { ACTION_DELETE_NODE } = this.props;
    ACTION_DELETE_NODE(node.id);
  }

  onDeleteEdge = (edge: IEdge) => {
    const { ACTION_DELETE_EDGE } = this.props;
    ACTION_DELETE_EDGE(edge.id);
  }

  onSwapEdge = (sourceNode: INode, targetNode: INode, edge: IEdge) => {
    const { ACTION_SWAP_EDGE } = this.props;
    ACTION_SWAP_EDGE(edge.id, sourceNode.id, targetNode.id);
  }

  onUndo = () => {
    const { ACTION_UNDO_GRAPH, isUndoAvailable } = this.props;

    if (!isUndoAvailable) {
      return;
    }

    ACTION_UNDO_GRAPH();
  }

  onRedo = () => {
    const { ACTION_REDO_GRAPH, isRedoAvailable } = this.props;

    if (!isRedoAvailable) {
      return;
    }

    ACTION_REDO_GRAPH();
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

  // Necessary commented out code below. Please do not mind it.
  // updateBwdl = () => {
  //   const { bwdlJson } = this.state;
  //   const transformed = BwdlTransformer.transform(bwdlJson);
  //   this.setState({
  //     edges: transformed.edges,
  //     nodes: transformed.nodes,
  //   });
  // };

  GraphView: { current: null | HTMLDivElement };

  render() {
    const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig;
    const { layoutEngineType } = this.state;
    const {
      isFullScreen, graph, minZoom, maxZoom, zoomControlsRef, ACTION_SAVE_GRAPH_TO_UNDO,
    } = this.props;

    const graphClass = classNames({
      'full-screen': isFullScreen,
    });

    return (
      <div id="graph" className={graphClass}>
        <div className="graph-container">
          <GraphView
            ref={this.GraphView}
            minZoom={minZoom / 100}
            maxZoom={maxZoom / 100}
            nodes={graph.nodes.map(({ data }) => data)}
            edges={graph.edges.map(({ data }) => data)}
            selected={this.getSelectedItem}
            nodeTypes={NodeTypes}
            nodeSubtypes={NodeSubtypes}
            edgeTypes={EdgeTypes}
            onSelectNode={this.onSelectItem}
            onCreateNode={this.onCreateNode}
            onUpdateNode={this.onUpdateNode}
            onDeleteNode={this.onDeleteNode}
            onSelectEdge={this.onSelectItem}
            onCreateEdge={this.onCreateEdge}
            onSwapEdge={this.onSwapEdge}
            onDeleteEdge={this.onDeleteEdge}
            onUndo={this.onUndo}
            onRedo={this.onRedo}
            saveCurStateToUndo={ACTION_SAVE_GRAPH_TO_UNDO}
            onCopySelected={this.onCopySelected}
            onPasteSelected={this.onPasteSelected}
            layoutEngineType={layoutEngineType}
            zoomControlsRef={zoomControlsRef}
          />
        </div>

        { this.getSelectedItem && <div>SIDEBAR HERE!!!!</div> }
      </div>
    );
  }
}

const mapStateToProps = ({ constructor: { zoom, graph } }) => ({
  minZoom: zoom.minZoom,
  maxZoom: zoom.maxZoom,
  graph: graph.current,
  isUndoAvailable: !!graph.undo.length,
  isRedoAvailable: !!graph.redo.length,
  zoomControlsRef: zoom.zoomControlsRef,
});

const mapDispatchToProps = dispatch => ({
  ACTION_SWAP_EDGE: (edgeId: number, sourceNodeId: number, targetNodeId: number) => {
    dispatch(actions.ACTION_SWAP_EDGE(edgeId, sourceNodeId, targetNodeId));
  },
  ACTION_DELETE_EDGE: (edgeId: number) => {
    dispatch(actions.ACTION_DELETE_EDGE(edgeId));
  },
  ACTION_CREATE_EDGE: (edgeData: EdgeType) => {
    dispatch(actions.ACTION_CREATE_EDGE(edgeData));
  },
  ACTION_DELETE_NODE: (nodeId: number) => {
    dispatch(actions.ACTION_DELETE_NODE(nodeId));
  },
  ACTION_UPDATE_NODE: (nodeData: INode) => {
    dispatch(actions.ACTION_UPDATE_NODE(nodeData));
  },
  ACTION_CREATE_NODE: (nodeData: NodeType) => {
    dispatch(actions.ACTION_CREATE_NODE(nodeData));
  },
  ACTION_SELECT_ITEM: (id: number) => {
    dispatch(actions.ACTION_SELECT_ITEM(id));
  },
  ACTION_REDO_GRAPH: () => {
    dispatch(actions.ACTION_REDO_GRAPH());
  },
  ACTION_UNDO_GRAPH: () => {
    dispatch(actions.ACTION_UNDO_GRAPH());
  },
  ACTION_SAVE_GRAPH_TO_UNDO: () => {
    dispatch(actions.ACTION_SAVE_GRAPH_TO_UNDO());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
