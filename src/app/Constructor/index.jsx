// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import isEqual from 'lodash.isequal';
import {
  Dashboard as TemplateIcon,
  DashboardOutlined as TemplateOutlinedIcon,
} from '@material-ui/icons';

import Graph from './Graph';
import ToolbarTemplates from './Toolbars';
import SOPicker from '../Modals/SOPicker';
import LinkEditor from '../Modals/LinkEditor';
import NodeEditor from '../Modals/NodeEditor';
import Input from '../../shared/components/Input';
import ConfirmationModal from '../../shared/components/ConfirmationModal';
import SearchModal from '../../shared/components/SearchModal';

import * as mapActions from '../reducers/map/action';
import * as templatesActions from '../reducers/templates/action';

import type { Template as TemplateType } from '../reducers/templates/types';
import type { IConstructorProps, IConstructorState } from './types';

import { MODALS_NAMES } from '../Modals/config';
import { CONFIRMATION_MODALS } from './config';
import { PAGE_TITLES } from '../config';
import { getFocusedNode, getSelectedEdge } from './utils';

export class Constructor extends PureComponent<IConstructorProps, IConstructorState> {
  templateInputName: { current: null | React$Element<any> };

  constructor(props: IConstructorProps) {
    super(props);
    this.state = {
      selectedLink: null,
      focusedNode: null,
      isShowCreateTemplateModal: false,
      isShowPreBuiltTemplatesModal: false,
    };

    this.templateInputName = React.createRef();

    this.validateUrl();
  }

  static getDerivedStateFromProps(nextProps: IConstructorProps, state: IConstructorState) {
    const { nodes, edges, mapName } = nextProps;

    Constructor.setPageTitle(mapName);

    const focusedNode = getFocusedNode(nodes);
    if (!isEqual(state.focusedNode, focusedNode)) {
      return {
        focusedNode,
      };
    }

    const selectedLink = getSelectedEdge(edges);
    if (!isEqual(state.selectedLink, selectedLink)) {
      return {
        selectedLink,
      };
    }

    return null;
  }

  static setPageTitle(mapName: string): void{
    const newTitle = PAGE_TITLES.DESIGNER(mapName);
    if (newTitle !== document.title) {
      document.title = newTitle;
    }
  }

  validateUrl = (): void => {
    const {
      mapId, match, history, ACTION_GET_MAP_REQUESTED,
    } = this.props;
    const mapIdUrl = match.params.mapId;
    const pageRefreshed = !mapId && mapIdUrl;

    if (pageRefreshed) {
      ACTION_GET_MAP_REQUESTED(mapIdUrl);
    } else if (!mapIdUrl) {
      history.push('/404');
    }
  }

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

  handleTemplateChoose = (template: TemplateType): void => {
    const { ACTION_EXTEND_MAP_REQUESTED } = this.props;
    ACTION_EXTEND_MAP_REQUESTED(template.id);

    this.closeModal(CONFIRMATION_MODALS.PRE_BUILT_TEMPLATES);
  }

  render() {
    const {
      focusedNode, selectedLink, isShowCreateTemplateModal, isShowPreBuiltTemplatesModal,
    } = this.state;
    const {
      isShowSOPicker, templates, isTemplatesFetching,
    } = this.props;

    return (
      <>
        <ToolbarTemplates showModal={this.showModal} />

        <Graph />

        { Boolean(selectedLink) && <LinkEditor link={selectedLink} /> }
        { Boolean(focusedNode) && <NodeEditor node={focusedNode} /> }
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
          <SearchModal
            label="Pre-built templates"
            searchLabel="Search for template"
            text="Please choose appropriate template:"
            items={templates}
            onClose={() => this.closeModal(CONFIRMATION_MODALS.PRE_BUILT_TEMPLATES)}
            onItemChoose={this.handleTemplateChoose}
            isItemsFetching={isTemplatesFetching}
            iconEven={TemplateIcon}
            iconOdd={TemplateOutlinedIcon}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ map, modals, templates }) => ({
  mapId: map.id,
  mapName: map.name,
  nodes: map.nodes,
  edges: map.edges,
  isShowSOPicker: modals[MODALS_NAMES.SO_PICKER_MODAL].isShow,
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
