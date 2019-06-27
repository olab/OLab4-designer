// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
import ConfirmationModal from '../../shared/components/ConfirmationModal';
import TemplatesModal from '../../shared/components/TemplatesModal';

import * as mapActions from '../reducers/map/action';
import * as templatesActions from '../reducers/templates/action';

import type { EdgeData as EdgeDataType } from './Graph/Edge/types';
import type { NodeData as NodeDataType } from './Graph/Node/types';
import type { MapItem as MapItemType } from '../reducers/map/types';
import type { IConstructorProps, IConstructorState } from './types';

import { CONFIRMATION_MODALS } from './config';

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
      isShowPreBuiltTemplatesModal: false,
    };

    this.templateInputName = React.createRef();

    this.validateUrl();
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

  validateUrl = (): void => {
    const {
      map, match, history, ACTION_GET_MAP_REQUESTED,
    } = this.props;
    const mapIdUrl = match.params.mapId;
    const pageRefreshed = !map.id && mapIdUrl;

    if (pageRefreshed) {
      ACTION_GET_MAP_REQUESTED(mapIdUrl);
    } else if (!mapIdUrl) {
      history.push('/404');
    }
  }

  changeIfFullScreen = (isFullScreen: boolean): void => {
    this.setState({ isFullScreen });
  };

  toggleFullScreen = (): void => {
    this.setState(({ isFullScreen }) => ({
      isFullScreen: !isFullScreen,
    }));
  };

  showModal = (modalName: string): void => {
    const { ACTION_TEMPLATES_REQUESTED } = this.props;

    if (modalName === CONFIRMATION_MODALS.PRE_BUILT_TEMPLATES) {
      ACTION_TEMPLATES_REQUESTED();
    }

    this.setState({
      [`isShow${modalName}Modal`]: true,
    });
  }

  closeModal = (modalName: string): void => {
    this.setState({
      [`isShow${modalName}Modal`]: false,
    });
  }

  saveTemplateFromMap = (): void => {
    const { current: templateInput } = this.templateInputName;

    if (!templateInput || !templateInput.state) {
      return;
    }

    const { value: templateName } = templateInput.state;

    if (!templateName) {
      return;
    }

    const { ACTION_TEMPLATE_UPLOAD_REQUESTED } = this.props;

    ACTION_TEMPLATE_UPLOAD_REQUESTED(templateName);

    this.closeModal(CONFIRMATION_MODALS.CREATE_TEMPLATE);
  }

  handleTemplateChoose = (templateId: number): void => {
    const { ACTION_EXTEND_MAP_REQUESTED } = this.props;
    ACTION_EXTEND_MAP_REQUESTED(templateId);

    this.closeModal(CONFIRMATION_MODALS.PRE_BUILT_TEMPLATES);
  }

  render() {
    const {
      isFullScreen,
      selectedNode,
      selectedLink,
      isShowCreateTemplateModal,
      isShowPreBuiltTemplatesModal,
    } = this.state;
    const {
      isShowSOPicker,
      templates,
      isTemplatesFetching,
    } = this.props;

    return (
      <ConstructorWrapper>
        <Fullscreen
          enabled={isFullScreen}
          onChange={this.changeIfFullScreen}
        >
          <ToolbarTemplates
            fullscreenHandler={this.toggleFullScreen}
            showModal={this.showModal}
            isFullScreen={isFullScreen}
          />

          <Graph
            isFullScreen={isFullScreen}
          />
          { !!selectedLink && <LinkEditor link={selectedLink} /> }
          { !!selectedNode && <NodeEditor node={selectedNode} /> }
          { isShowSOPicker && <SOPicker /> }

          {isShowCreateTemplateModal && (
            <ConfirmationModal
              label="Create template"
              text="Please enter name of template:"
              onClose={() => this.closeModal(CONFIRMATION_MODALS.CREATE_TEMPLATE)}
              onSave={this.saveTemplateFromMap}
              showFooterButtons
            >
              <Input
                ref={this.templateInputName}
                label="Template Name"
                autoFocus
                fullWidth
              />
            </ConfirmationModal>
          )}
          {isShowPreBuiltTemplatesModal && (
            <TemplatesModal
              label="Pre-built templates"
              text="Please choose appropriate template:"
              onClose={() => this.closeModal(CONFIRMATION_MODALS.PRE_BUILT_TEMPLATES)}
              onTemplateChoose={this.handleTemplateChoose}
              templates={templates}
              isTemplatesFetching={isTemplatesFetching}
            />
          )}
        </Fullscreen>
      </ConstructorWrapper>
    );
  }
}

const mapStateToProps = ({ map, modals, templates }) => ({
  map,
  isShowSOPicker: modals.SOPickerModal.isShow,
  templates: templates.list,
  isTemplatesFetching: templates.isFetching,
});

const mapDispatchToProps = dispatch => ({
  ACTION_GET_MAP_REQUESTED: (mapId: string) => {
    dispatch(mapActions.ACTION_GET_MAP_REQUESTED(mapId));
  },
  ACTION_EXTEND_MAP_REQUESTED: (templateId: number) => {
    dispatch(mapActions.ACTION_EXTEND_MAP_REQUESTED(templateId));
  },
  ACTION_TEMPLATE_UPLOAD_REQUESTED: (templateName: string) => {
    dispatch(templatesActions.ACTION_TEMPLATE_UPLOAD_REQUESTED(templateName));
  },
  ACTION_TEMPLATES_REQUESTED: () => {
    dispatch(templatesActions.ACTION_TEMPLATES_REQUESTED());
  },
});

export default DragDropContext(HTML5Backend)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withRouter(Constructor)),
);
