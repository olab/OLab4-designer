// @flow
import type { SOPickerModal as SOPickerType } from '../../Modals/types';

export type ToolbarItem = {
  id: string,
  name: string,
  icon: string,
  mouseIcon: string,
  order: number,
  label: string,
  onClick?: Function,
};

export type ToolbarGroup = {
  id: string,
  order: number,
  itemList: Array<ToolbarItem>,
  onClick: Function,
};

export type IToolbarsProps = {
  classes: any,
  fullscreenHandler: Function,
  showCreateTemplateModal: Function,
  isFullScreen: boolean,
  isUndoAvailable: boolean,
  isRedoAvailable: boolean,
  SOPickerModal: SOPickerType,
  ACTION_UNDO_MAP: Function,
  ACTION_REDO_MAP: Function,
  ACTION_SET_ZOOM_CONTROLS_REF: (
    ref: { current: null | HTMLDivElement },
  ) => void,
  ACTION_TOGGLE_MODAL: Function,
  ACTION_SET_POSITION_MODAL: Function,
};

export type IToolbarsState = {
  expand: string,
  preview: ToolbarGroup,
  toolbars: ToolbarGroup,
  meta: ToolbarGroup,
  right: ToolbarGroup,
};
