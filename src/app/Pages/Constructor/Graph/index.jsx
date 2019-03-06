// @flow
/* eslint-disable no-return-assign, no-param-reassign */
import React, { Component } from 'react';

import {
  GraphView,
  type IEdgeType as IEdge,
  type INodeType as INode,
  type LayoutEngineType,
  BwdlTransformer,
} from 'react-digraph';
import classNames from 'classnames';

import Sidebar from '../Sidebar';
import BwdlNodeForm from './NodeForm';

// Configures node/edge types
import GraphConfig, {
  EMPTY_TYPE, NODE_KEY,
} from './config';
import bwdlExample from './sample';

import './graph.scss';


type IGraphProps = {
  isFullScreen: boolean,
};

type IGraphState = {
  nodes: INode[];
  edges: IEdge[];
  selected: INode | IEdge | null;
  layoutEngineType: LayoutEngineType;
  bwdlJson: any;
  copiedNode: any;
  selectedBwdlNode: any;
};

class Graph extends Component<IGraphProps, IGraphState> {
  constructor(props: any) {
    super(props);

    const transformed = BwdlTransformer.transform(bwdlExample);

    this.state = {
      bwdlJson: bwdlExample,
      copiedNode: null,
      edges: transformed.edges,
      layoutEngineType: 'VerticalTree',
      nodes: transformed.nodes,
      selected: null,
      selectedBwdlNode: null,
    };
  }

  /**
   * Action handler onSelectNode at the area
   * @param node
   */
  onSelectNode = (node: INode | null) => {
    const { bwdlJson } = this.state;
    this.setState({
      selected: node,
      selectedBwdlNode: node
        ? bwdlJson.States[node.title]
        : null,
    });
  };

  /**
   * Action handler onSelectEdge
   * @param edge
   */
  onSelectEdge = (edge: IEdge) => {
    this.setState({
      selected: edge,
    });
  };

  /**
   * Action handler onCrate Node in posion
   * @param x
   * @param y
   */
  onCreateNode = (x: number, y: number) => {
    const { bwdlJson } = this.state;
    const newBwdlJson = {
      ...bwdlJson,
    };
    newBwdlJson.States[`New Item ${Date.now()}`] = {
      Type: EMPTY_TYPE,
      x,
      y,
    };
    this.setState({
      bwdlJson: newBwdlJson,
    });
    this.updateBwdl();
  };

  /**
   * Action handler onCreateEdge
   * @param sourceNode
   * @param targetNode
   */
  onCreateEdge = (sourceNode: INode, targetNode: INode) => {
    this.linkEdge(sourceNode, targetNode);
  };

  onUpdateNode = () => { };

  /**
   * Action handler onDeleteNode by INode
   * @param selected
   */
  onDeleteNode = (selected: INode) => {
    const { bwdlJson } = this.state;
    const newBwdlJson = {
      ...bwdlJson,
    };
    delete newBwdlJson.States[selected.title];
    this.setState({
      bwdlJson: newBwdlJson,
    });
    this.updateBwdl();
  };

  /**
   * Action handler onDeleteEdge in IEdge
   * @param selectedEdge
   */
  onDeleteEdge = (selectedEdge: IEdge) => {
    const { bwdlJson } = this.state;
    const newBwdlJson = {
      ...bwdlJson,
    };
    const sourceNodeBwdl = newBwdlJson.States[selectedEdge.source];
    if (sourceNodeBwdl.Choices) {
      sourceNodeBwdl.Choices = sourceNodeBwdl.Choices
        .filter(choice => choice.Next !== selectedEdge.target);
    } else {
      delete sourceNodeBwdl.Next;
    }

    this.setState({
      bwdlJson: newBwdlJson,
    });
    this.updateBwdl();
  };

  onSwapEdge = (sourceNode: INode, targetNode: INode, edge: IEdge) => {
    this.linkEdge(sourceNode, targetNode, edge);
  };

  onUndo = () => {
    /**
     * Not implemented
     * Normally any add, remove, or update would record the action in an array.
     * In order to undo it one would simply call the inverse of the action performed.
     *  For instance, if someone called onDeleteEdge with (viewEdge, i, edges)
     *  then an undelete would be a splicing the original viewEdge
     *  into the edges array at position i.
     */
  };

  onCopySelected = () => {
    const { selected, bwdlJson } = this.state;
    if (!selected) {
      return;
    }

    const original = bwdlJson.States[selected.title];
    const newItem = JSON.parse(JSON.stringify(original));

    this.setState({
      copiedNode: newItem,
    });
  };

  onPasteSelected = () => {
    const { copiedNode, bwdlJson } = this.state;

    bwdlJson.States[`New Item ${Date.now()}`] = copiedNode;

    const newBwdlJson = {
      ...bwdlJson,
    };

    this.setState({
      bwdlJson: newBwdlJson,
    });
    this.updateBwdl();
  };

  updateBwdl = () => {
    const { bwdlJson } = this.state;
    const transformed = BwdlTransformer.transform(bwdlJson);
    this.setState({
      edges: transformed.edges,
      nodes: transformed.nodes,
    });
  };

  linkEdge = (sourceNode: INode, targetNode: INode, edge?: IEdge) => {
    const { bwdlJson } = this.state;
    const newBwdlJson = {
      ...bwdlJson,
    };
    const sourceNodeBwdl = newBwdlJson.States[sourceNode.title];
    if (sourceNodeBwdl.Type === 'Choice') {
      const newChoice = {
        Next: targetNode.title,
      };
      if (sourceNodeBwdl.Choices) {
        // check if swapping edge
        let swapped = false;
        if (edge) {
          sourceNodeBwdl.Choices.forEach((choice) => {
            if (edge && choice.Next === edge.target) {
              choice.Next = targetNode.title;
              swapped = true;
            }
          });
        }
        if (!swapped) {
          sourceNodeBwdl.Choices.push(newChoice);
        }
      } else {
        sourceNodeBwdl.Choices = [newChoice];
      }
    } else {
      sourceNodeBwdl.Next = targetNode.title;
    }
    this.setState({
      bwdlJson: newBwdlJson,
    });
    this.updateBwdl();
  };

  renderGraph = () => {
    const {
      nodes, edges, selected, layoutEngineType,
    } = this.state;
    const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig;

    return (
      <GraphView
        ref={el => (this.GraphView = el)}
        nodeKey={NODE_KEY}
        readOnly
        nodes={nodes}
        edges={edges}
        selected={selected}
        nodeTypes={NodeTypes}
        nodeSubtypes={NodeSubtypes}
        edgeTypes={EdgeTypes}
        onSelectNode={this.onSelectNode}
        onCreateNode={this.onCreateNode}
        onUpdateNode={this.onUpdateNode}
        onDeleteNode={this.onDeleteNode}
        onSelectEdge={this.onSelectEdge}
        onCreateEdge={this.onCreateEdge}
        onSwapEdge={this.onSwapEdge}
        onDeleteEdge={this.onDeleteEdge}
        onUndo={this.onUndo}
        onCopySelected={this.onCopySelected}
        onPasteSelected={this.onPasteSelected}
        layoutEngineType={layoutEngineType}
      />
    );
  };

  renderRightSidebar = () => {
    const { selectedBwdlNode, selected, bwdlJson } = this.state;
    if (!selected) {
      return null;
    }
    return (
      <Sidebar direction="right" size="100%">
        <div className="selected-node-container">
          <BwdlNodeForm
            bwdlNode={selectedBwdlNode}
            bwdlNodeKey={selected.title}
            nextChoices={Object.keys(bwdlJson.States)}
          />
        </div>
      </Sidebar>
    );
  };

  GraphView: GraphView | null;

  render() {
    const { selectedBwdlNode } = this.state;
    const { isFullScreen } = this.props;

    const graphClass = classNames({
      'full-screen': isFullScreen,
    });
    return (
      <div id="graph" className={graphClass}>
        <div className="graph-container">
          {this.renderGraph()}
        </div>
        {selectedBwdlNode && this.renderRightSidebar()}
      </div>
    );
  }
}

export default Graph;
