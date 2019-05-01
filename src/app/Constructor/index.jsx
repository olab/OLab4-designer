// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Fullscreen from 'react-full-screen';
import isEqual from 'lodash.isequal';

import Graph from './Graph';
import ToolbarTemplates from './Toolbars';
import LinkEditor from '../Modals/LinkEditor';

import type { EdgeData as EdgeDataType } from './Graph/Edge/types';
import type {
  NodeData as NodeDataType,
  GraphItem as GraphItemType,
  IConstructorProps,
  IConstructorState,
} from './types';

import { ConstructorWrapper } from './styles';

export class Constructor extends Component<IConstructorProps, IConstructorState> {
  state: IConstructorState = {
    isFullScreen: false,
    selectedLink: null,
    selectedNode: null,
  };

  static getDerivedStateFromProps(nextProps: IConstructorProps, state: IConstructorState) {
    const selectedNode: NodeDataType | null = Constructor.getSelectedNode(nextProps.graph);
    if (!isEqual(state.selectedNode, selectedNode)) {
      return {
        selectedNode,
      };
    }

    const selectedLink: EdgeDataType | null = Constructor.getSelectedEdge(nextProps.graph);
    if (!isEqual(state.selectedLink, selectedLink)) {
      return {
        selectedLink,
      };
    }

    return null;
  }

  static getSelectedNode(graph: GraphItemType): NodeDataType | null {
    const selectedNode = graph.nodes.find(node => node.isSelected);

    if (selectedNode) {
      return selectedNode.data;
    }

    return null;
  }

  static getSelectedEdge(graph: GraphItemType): EdgeDataType | null {
    const selectedLink = graph.edges.find(edge => edge.isSelected);

    if (selectedLink) {
      return selectedLink.data;
    }

    return null;
  }

  changeIfFullScreen = (isFullScreen: boolean) => {
    this.setState({ isFullScreen });
  };

  toggleFullScreen = () => {
    this.setState(({ isFullScreen }) => ({ isFullScreen: !isFullScreen }));
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { isFullScreen, selectedNode, selectedLink } = this.state;

    return (
      <ConstructorWrapper>
        <Fullscreen
          enabled={isFullScreen}
          onChange={this.changeIfFullScreen}
        >
          <ToolbarTemplates
            fullscreenHandler={this.toggleFullScreen}
            isFullScreen={isFullScreen}
          />

          <Graph isFullScreen={isFullScreen} />

          { !!selectedLink && <LinkEditor link={selectedLink} /> }
        </Fullscreen>
      </ConstructorWrapper>
    );
  }
}

const mapStateToProps = ({ constructor: { graph } }) => ({
  graph: graph.current,
});

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps)(Constructor),
);
