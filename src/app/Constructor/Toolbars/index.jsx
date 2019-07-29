// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { AppBar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ToolbarGroup from '../../../shared/components/ToolbarGroup';
import GraphUndoRedoButtons from '../Graph/UndoRedo';
import MapTitle from './MapTitle';

import templateIcon from '../../../shared/assets/icons/toolbar_template.svg';
import fullscreenIcon from '../../../shared/assets/icons/toolbar_fullscreen.svg';
import unfullscreenIcon from '../../../shared/assets/icons/toolbar_unfullscreen.svg';
import SOPickerIcon from '../../../shared/assets/icons/toolbar_so_picker.svg';
import createTemplateFromMapIcon from '../../../shared/assets/icons/toolbar_create_template.svg';

import type {
  ToolbarItem as ToolbarItemType,
  ToolbarGroup as ToolbarGroupType,
  IToolbarsProps,
  IToolbarsState,
} from './types';

import { ZOOM_CONTROLS_ID, CONFIRMATION_MODALS } from '../config';
import { MODALS_NAMES } from '../../Modals/config';

import * as constructorActions from '../action';
import * as mapActions from '../../reducers/map/action';
import * as modalActions from '../../Modals/action';

import styles, { Block, LabTitleItem } from './styles';

export class Toolbars extends PureComponent<IToolbarsProps, IToolbarsState> {
  componentDidUpdate(prevProps: IToolbarsProps) {
    const { isFullScreen: isFullScreenPrev } = prevProps;
    const { isFullScreen } = this.props;
    const isToFullScreen = !isFullScreenPrev && isFullScreen;
    const isFromFullScreen = isFullScreenPrev && !isFullScreen;

    if (isToFullScreen) {
      this.toolbarRight.itemList = [this.unfullScreenItem];
      this.forceUpdate();
    } else if (isFromFullScreen) {
      this.toolbarRight.itemList = [this.fullScreenItem];
      this.forceUpdate();
    }
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

  handleToolbarClick = (toolbarItemId: string): void => {
    const { showModal, ACTION_TOGGLE_MODAL, ACTION_TOGGLE_FULLSCREEN } = this.props;

    switch (toolbarItemId) {
      case 'template':
        showModal(CONFIRMATION_MODALS.PRE_BUILT_TEMPLATES);
        break;
      case 'createTemplateFromMap':
        showModal(CONFIRMATION_MODALS.CREATE_TEMPLATE);
        break;
      case 'so_picker':
        ACTION_TOGGLE_MODAL();
        break;
      case 'fullscreen':
      case 'unfullscreen':
        ACTION_TOGGLE_FULLSCREEN();
        break;
      default: break;
    }
  }

  toolbarLeft: ToolbarGroupType = {
    id: 'toolbarLeft',
    itemList: [
      {
        id: 'template',
        icon: templateIcon,
        label: 'Choose template',
        onClick: this.handleToolbarClick,
      },
      {
        id: 'createTemplateFromMap',
        icon: createTemplateFromMapIcon,
        label: 'Create Template From Map',
        onClick: this.handleToolbarClick,
      },
      {
        id: 'so_picker',
        icon: SOPickerIcon,
        label: 'Open/Close Object Picker',
        onClick: this.handleToolbarClick,
      },
    ],
  };

  fullScreenItem: ToolbarItemType = {
    id: 'fullscreen',
    icon: fullscreenIcon,
    label: 'Go to Fullscreen',
    onClick: this.handleToolbarClick,
  };

  unfullScreenItem: ToolbarItemType = {
    id: 'unfullscreen',
    icon: unfullscreenIcon,
    label: 'Exit from Fullscreen',
    onClick: this.handleToolbarClick,
  };

  toolbarRight: ToolbarGroupType = {
    id: 'toolbarRight',
    itemList: [this.fullScreenItem],
  };

  render() {
    const { isUndoAvailable, isRedoAvailable, classes } = this.props;

    return (
      <AppBar className={classes.positionRelative} position="fixed">
        <Block>
          <ToolbarGroup group={this.toolbarLeft} />
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
          </LabTitleItem>
          <div id={ZOOM_CONTROLS_ID} />
          <ToolbarGroup group={this.toolbarRight} />
        </Block>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ map: { undo, redo }, constructor }) => ({
  isUndoAvailable: !!undo.length,
  isRedoAvailable: !!redo.length,
  isFullScreen: constructor.isFullScreen,
});

const mapDispatchToProps = dispatch => ({
  ACTION_TOGGLE_FULLSCREEN: () => {
    dispatch(constructorActions.ACTION_TOGGLE_FULLSCREEN());
  },
  ACTION_UNDO_MAP: () => {
    dispatch(mapActions.ACTION_UNDO_MAP());
  },
  ACTION_REDO_MAP: () => {
    dispatch(mapActions.ACTION_REDO_MAP());
  },
  ACTION_TOGGLE_MODAL: () => {
    dispatch(modalActions.ACTION_TOGGLE_MODAL(MODALS_NAMES.SO_PICKER_MODAL));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withStyles(styles)(Toolbars),
);
