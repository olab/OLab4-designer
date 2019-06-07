// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Fullscreen from 'react-full-screen';
import isEqual from 'lodash.isequal';

import Graph from './Graph';
import ToolbarTemplates from './Toolbars';
import SOPicker from '../Modals/SOPicker';
import LinkEditor from '../Modals/LinkEditor';
import NodeEditor from '../Modals/NodeEditor';
import Input from '../../shared/components/Input';
import TemplateModal from '../../shared/components/ConfirmationModal';

import * as actions from '../reducers/templates/action';

import type { EdgeData as EdgeDataType } from './Graph/Edge/types';
import type { NodeData as NodeDataType } from './Graph/Node/types';
import type {
  Map as MapType,
  MapItem as MapItemType,
} from '../reducers/map/types';
import type {
  IConstructorProps,
  IConstructorState,
} from './types';

import { ConstructorWrapper } from './styles';

export class Constructor extends PureComponent<IConstructorProps, IConstructorState> {
  templateInputName: { current: null | React$Element<any> };

  constructor(props: IConstructorProps) {
    super(props);
    this.state = {
      selectedLink: null,
      selectedNode: null,
      isFullScreen: false,
      isShowCreateTemplateModal: false,
    };

    this.templateInputName = React.createRef();
  }

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

  static getSelectedNode(map: MapItemType): NodeDataType | null {
    const selectedNode = map.nodes.find(node => node.isSelected);

    if (selectedNode) {
      return selectedNode.data;
    }

    return null;
  }

  static getSelectedEdge(map: MapItemType): EdgeDataType | null {
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
    this.setState(({ isFullScreen }) => ({
      isFullScreen: !isFullScreen,
    }));
  };

  showCreateTemplateModal = () => {
    this.setState({
      isShowCreateTemplateModal: true,
    });
  }

  closeCreateTemplateModal = () => {
    this.setState({
      isShowCreateTemplateModal: false,
    });
  }

  saveTemplateFromMap = () => {
    if (this.templateInputName && this.templateInputName.current) {
      const { value } = this.templateInputName.current.state;

      if (value) {
        const { map, ACTION_CREATE_TEMPLATE_FROM_MAP } = this.props;

        ACTION_CREATE_TEMPLATE_FROM_MAP(value, map);
      }
    }

    this.closeCreateTemplateModal();
  }

  render() {
    const {
      isFullScreen, selectedNode, selectedLink, isShowCreateTemplateModal,
    } = this.state;
    const { isShowSOPicker } = this.props;

    return (
      <ConstructorWrapper>
        <Fullscreen
          enabled={isFullScreen}
          onChange={this.changeIfFullScreen}
        >
          <ToolbarTemplates
            fullscreenHandler={this.toggleFullScreen}
            showCreateTemplateModal={this.showCreateTemplateModal}
            isFullScreen={isFullScreen}
          />

          <Graph
            isFullScreen={isFullScreen}
          />
          { !!selectedLink && <LinkEditor link={selectedLink} /> }
          { !!selectedNode && <NodeEditor node={selectedNode} /> }
          { isShowSOPicker && <SOPicker /> }

          {isShowCreateTemplateModal && (
            <TemplateModal
              label="Create template"
              text="Please enter name of template:"
              onClose={this.closeCreateTemplateModal}
              onSave={this.saveTemplateFromMap}
              showFooterButtons
            >
              <Input
                ref={this.templateInputName}
                label="Template Name"
                autoFocus
                fullWidth
              />
            </TemplateModal>
          )}
        </Fullscreen>
      </ConstructorWrapper>
    );
  }
}

const mapStateToProps = ({ map, modals }) => ({
  map,
  isShowSOPicker: modals.SOPickerModal.isShow,
});

const mapDispatchToProps = dispatch => ({
  ACTION_CREATE_TEMPLATE_FROM_MAP: (templateName: string, map: MapType) => {
    dispatch(actions.ACTION_CREATE_TEMPLATE_FROM_MAP(templateName, map));
  },
});

export default DragDropContext(HTML5Backend)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Constructor),
);
