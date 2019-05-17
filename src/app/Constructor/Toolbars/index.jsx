// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MetaModal from '../../Modals/Meta-Modal';
import ToolbarGroup from '../../../shared/components/ToolbarGroup';
import GraphUndoRedoButtons from '../Graph/UndoRedo';
import MapTitle from './MapTitle';

import type {
  IToolbarsProps,
  IToolbarsState,
} from './types';
import { ModalsNames } from '../../Modals/config';

import moveIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-move.png';
import selectIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-select.png';
import addNewIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-addnew.png';
import templateIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-template.png';
import flagIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-flag.png';
import previewIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-preview.png';
// import
// dropdownIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-arrow-dropdown.png';
import fullscreenIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-fullscreen.png';
import settingsIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-settings.png';
import questionIcon from '../../../shared/assets/icons/toolbar/templates/meta-question.png';
import assetsIcon from '../../../shared/assets/icons/toolbar/templates/meta-assets.png';
import addIcon from '../../../shared/assets/icons/toolbar/templates/meta-add.png';
import counterIcon from '../../../shared/assets/icons/toolbar/templates/meta-counter.png';
import filesIcon from '../../../shared/assets/icons/toolbar/templates/meta-files.png';

import * as constructorActions from '../action';
import * as mapActions from '../../reducers/map/action';
import * as metaModalActions from '../../Modals/action';

import styles, {
  Block,
  LabTitleItem,
  // LabTitle,
  // LabIcon,
} from './styles';

export class Toolbars extends Component<IToolbarsProps, IToolbarsState> {
  constructor(props: IToolbarsProps) {
    super(props);

    const { fullscreenHandler } = props;

    this.state = {
      expand: '',
      preview: {
        id: 'toolbars',
        order: 10,
        itemList: [
          {
            id: 'preview',
            name: 'preview',
            icon: previewIcon,
            mouseIcon: 'template_mouse_icon',
            order: 10,
            label: 'preview',
          },
        ],
      },
      toolbars: {
        id: 'toolbars',
        order: 10,
        itemList: [
          {
            id: 'cursors',
            name: 'cursors',
            icon: moveIcon,
            mouseIcon: 'template_mouse_icon',
            order: 10,
            label: 'cursors',
          },
          {
            id: 'select',
            name: 'select',
            icon: selectIcon,
            mouseIcon: 'template_mouse_icon',
            order: 20,
            label: 'Select area',
          },
          {
            id: 'addNew',
            name: 'add_new',
            icon: addNewIcon,
            mouseIcon: 'template_mouse_icon',
            order: 30,
            label: 'Add New',
          },
          {
            id: 'template',
            name: 'template',
            icon: templateIcon,
            mouseIcon: 'template_mouse_icon',
            order: 40,
            label: 'Choose template',
          },
          {
            id: 'flag',
            name: 'flag',
            icon: flagIcon,
            mouseIcon: 'template_mouse_icon',
            order: 50,
            label: 'flag',
          },
        ],
      },
      right: {
        id: 'right',
        order: 20,
        itemList: [
          {
            id: 'fullscreen',
            name: 'fullscreen',
            icon: fullscreenIcon,
            mouseIcon: 'template_mouse_icon',
            onClick: fullscreenHandler,
            order: 10,
            label: 'Go to fullscreen',
          },
          {
            id: 'settings',
            name: 'settings',
            icon: settingsIcon,
            mouseIcon: 'template_mouse_icon',
            order: 20,
            label: 'settings',
          },
        ],
      },
      meta: {
        id: 'meta',
        order: 10,
        itemList: [
          {
            id: 'question',
            name: 'question',
            icon: questionIcon,
            mouseIcon: 'template_mouse_icon',
            order: 10,
            label: 'Tutorial',
          },
          {
            id: 'assets',
            name: 'assets',
            icon: assetsIcon,
            mouseIcon: 'template_mouse_icon',
            order: 20,
            label: 'assets',
          },
          {
            id: 'counter',
            name: 'counter',
            icon: counterIcon,
            mouseIcon: 'template_mouse_icon',
            order: 20,
            label: 'Counter',
          },
          {
            id: 'files',
            name: 'files',
            icon: filesIcon,
            mouseIcon: 'template_mouse_icon',
            order: 20,
            label: 'Manage files',
          },
          {
            id: 'add',
            name: 'add',
            icon: addIcon,
            mouseIcon: 'template_mouse_icon',
            order: 20,
            label: 'add',
          },
        ],
        onClick: this.toggleShowMetaModal,
      },
    };

    this.zoomControlsRef = React.createRef();
  }

  componentDidMount() {
    const { ACTION_SET_ZOOM_CONTROLS_REF } = this.props;
    ACTION_SET_ZOOM_CONTROLS_REF(this.zoomControlsRef);
  }

  toggleShowMetaModal = (e: Event) => {
    const {
      ACTION_TOGGLE_META_MODAL, ACTION_SET_POSITION_META_MODAL, metaModal,
    } = this.props;

    if (!metaModal.isShow && !metaModal.x && !metaModal.y) {
      const toolbarItem = (e.target: window.HTMLInputElement).closest('.toolbar-item');
      const [{
        x: rectsX, y: rectsY, width: rectsWidth, height: rectsHeight,
      }] = toolbarItem.getClientRects();

      const x = rectsX + rectsWidth;
      const y = rectsY - rectsHeight;

      ACTION_SET_POSITION_META_MODAL(x, y);
    }

    ACTION_TOGGLE_META_MODAL();
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

  zoomControlsRef: { current: null | HTMLDivElement };

  render() {
    const {
      expand, toolbars, right, meta, preview,
    } = this.state;
    const {
      isUndoAvailable, isRedoAvailable, metaModal, classes,
    } = this.props;

    return (
      <>
        <AppBar className={classes.positionRelative} position="fixed">
          <Block>
            <ToolbarGroup group={preview} expand={expand} />
            <>
              <ToolbarGroup
                group={toolbars}
                expand={expand}
              />
              { metaModal.isShow && <MetaModal /> }
            </>
            <GraphUndoRedoButtons
              isUndoAvailable={isUndoAvailable}
              isRedoAvailable={isRedoAvailable}
              onUndo={this.onUndo}
              onRedo={this.onRedo}
            />
          </Block>
          <Block>
            <LabTitleItem>
              <MapTitle />
              {/* <LabTitle className="item">Lab name</LabTitle>
              <LabIcon alt="show" src={dropdownIcon} /> */}
            </LabTitleItem>
            <div ref={this.zoomControlsRef} />
            <ToolbarGroup group={right} />
          </Block>
        </AppBar>
        <AppBar className={classes.root}>
          <ToolbarGroup group={meta} expand={expand} />
        </AppBar>
      </>
    );
  }
}

const mapStateToProps = ({ map: { undo, redo }, modals: { metaModal } }) => ({
  isUndoAvailable: !!undo.length,
  isRedoAvailable: !!redo.length,
  metaModal,
});

const mapDispatchToProps = dispatch => ({
  ACTION_SET_ZOOM_CONTROLS_REF: (ref: { current: null | HTMLDivElement }) => {
    dispatch(constructorActions.ACTION_SET_ZOOM_CONTROLS_REF(ref));
  },
  ACTION_UNDO_MAP: () => {
    dispatch(mapActions.ACTION_UNDO_MAP());
  },
  ACTION_REDO_MAP: () => {
    dispatch(mapActions.ACTION_REDO_MAP());
  },
  ACTION_TOGGLE_META_MODAL: () => {
    dispatch(metaModalActions.ACTION_TOGGLE_MODAL(ModalsNames.META_MODAL));
  },
  ACTION_SET_POSITION_META_MODAL: (x: number, y: number) => {
    dispatch(metaModalActions.ACTION_SET_POSITION_MODAL(
      ModalsNames.META_MODAL,
      x,
      y,
    ));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Toolbars),
);
