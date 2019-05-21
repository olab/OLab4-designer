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
import NodeEditor from '../Modals/NodeEditor';

import type { EdgeData as EdgeDataType } from './Graph/Edge/types';
import type { NodeData as NodeDataType } from './Graph/Node/types';
import type {
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
    const selectedNode: NodeDataType | null = Constructor.getSelectedNode(nextProps.map);
    if (!isEqual(state.selectedNode, selectedNode)) {
      return {
        selectedNode,
      };
    }

    const selectedLink: EdgeDataType | null = Constructor.getSelectedEdge(nextProps.map);
    if (!isEqual(state.selectedLink, selectedLink)) {
      return {
        selectedLink,
      };
    }

    return null;
  }

  static getSelectedNode(map: GraphItemType): NodeDataType | null {
    const selectedNode = map.nodes.find(node => node.isSelected);

    if (selectedNode) {
      return selectedNode.data;
    }

    return null;
  }

  static getSelectedEdge(map: GraphItemType): EdgeDataType | null {
    const selectedLink = map.edges.find(edge => edge.isSelected);

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
          { !!selectedNode && <NodeEditor node={selectedNode} /> }
        </Fullscreen>
      </ConstructorWrapper>
    );
  }
}

const mapStateToProps = ({ map }) => ({
  map,
});

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps)(Constructor),
);
