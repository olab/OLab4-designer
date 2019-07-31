// @flow
import React from 'react';
import { connect } from 'react-redux';
import { AppBar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MapTitle from './MapTitle';
import GraphUndoRedoButtons from '../Graph/UndoRedo';
import ToolbarItem from '../../../shared/components/ToolbarItem';

import templateIcon from '../../../shared/assets/icons/toolbar_template.svg';
import fullscreenIcon from '../../../shared/assets/icons/toolbar_fullscreen.svg';
import unfullscreenIcon from '../../../shared/assets/icons/toolbar_unfullscreen.svg';
import SOPickerIcon from '../../../shared/assets/icons/toolbar_so_picker.svg';
import createTemplateFromMapIcon from '../../../shared/assets/icons/toolbar_create_template.svg';
import snapToGridOnIcon from '../../../shared/assets/icons/snap_to_grid_on.svg';
import snapToGridOffIcon from '../../../shared/assets/icons/snap_to_grid_off.svg';
import verticalTreeIcon from '../../../shared/assets/icons/vertical_tree.svg';

import type { IToolbarsProps } from './types';

import { ZOOM_CONTROLS_ID, CONFIRMATION_MODALS, LAYOUT_ENGINE } from '../config';
import { MODALS_NAMES } from '../../Modals/config';

import * as constructorActions from '../action';
import * as modalActions from '../../Modals/action';

import styles, { Block, LabTitleItem, ContainerWithPseudoBlocks } from './styles';

export const Toolbars = ({
  classes,
  showModal,
  isFullScreen,
  currentLayoutEngine,
  ACTION_TOGGLE_MODAL,
  ACTION_TOGGLE_FULLSCREEN,
  ACTION_SET_LAYOUT_ENGINE,
}: IToolbarsProps) => (
  <AppBar className={classes.positionRelative} position="fixed">
    <Block>
      <ToolbarItem
        icon={templateIcon}
        label="Choose template"
        onClick={() => showModal(CONFIRMATION_MODALS.PRE_BUILT_TEMPLATES)}
      />
      <ToolbarItem
        icon={createTemplateFromMapIcon}
        label="Create Template From Map"
        onClick={() => showModal(CONFIRMATION_MODALS.CREATE_TEMPLATE)}
      />
      <ToolbarItem
        icon={SOPickerIcon}
        label="Open/Close Object Picker"
        onClick={ACTION_TOGGLE_MODAL}
      />
      <GraphUndoRedoButtons />
    </Block>
    <Block>
      <LabTitleItem>
        <MapTitle />
      </LabTitleItem>

      <div id={ZOOM_CONTROLS_ID} />

      <ContainerWithPseudoBlocks>
        <ToolbarItem
          icon={snapToGridOffIcon}
          label="Snap to Node"
          onClick={() => ACTION_SET_LAYOUT_ENGINE(LAYOUT_ENGINE.NONE)}
          isActive={currentLayoutEngine === LAYOUT_ENGINE.NONE}
        />
        <ToolbarItem
          icon={snapToGridOnIcon}
          label="Snap to Grid"
          onClick={() => ACTION_SET_LAYOUT_ENGINE(LAYOUT_ENGINE.SNAP_TO_GRID)}
          isActive={currentLayoutEngine === LAYOUT_ENGINE.SNAP_TO_GRID}
        />
        <ToolbarItem
          icon={verticalTreeIcon}
          label="Vertical Tree"
          onClick={() => ACTION_SET_LAYOUT_ENGINE(LAYOUT_ENGINE.VERTICAL_TREE)}
          isActive={currentLayoutEngine === LAYOUT_ENGINE.VERTICAL_TREE}
        />
      </ContainerWithPseudoBlocks>

      {isFullScreen ? (
        <ToolbarItem
          icon={unfullscreenIcon}
          label="Exit from Fullscreen"
          onClick={ACTION_TOGGLE_FULLSCREEN}
        />
      ) : (
        <ToolbarItem
          icon={fullscreenIcon}
          label="Go to Fullscreen"
          onClick={ACTION_TOGGLE_FULLSCREEN}
        />
      )}
    </Block>
  </AppBar>
);

const mapStateToProps = ({ constructor }) => ({
  isFullScreen: constructor.isFullScreen,
  currentLayoutEngine: constructor.layoutEngine,
});

const mapDispatchToProps = dispatch => ({
  ACTION_TOGGLE_MODAL: () => {
    dispatch(modalActions.ACTION_TOGGLE_MODAL(MODALS_NAMES.SO_PICKER_MODAL));
  },
  ACTION_TOGGLE_FULLSCREEN: () => {
    dispatch(constructorActions.ACTION_TOGGLE_FULLSCREEN());
  },
  ACTION_SET_LAYOUT_ENGINE: (layoutEngine: string) => {
    dispatch(constructorActions.ACTION_SET_LAYOUT_ENGINE(layoutEngine));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withStyles(styles)(Toolbars),
);
