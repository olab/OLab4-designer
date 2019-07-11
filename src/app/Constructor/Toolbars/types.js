// @flow
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
  showModal: Function,
  isUndoAvailable: boolean,
  isRedoAvailable: boolean,
  ACTION_UNDO_MAP: Function,
  ACTION_REDO_MAP: Function,
  ACTION_TOGGLE_FULLSCREEN: Function,
  ACTION_SET_ZOOM_CONTROLS_REF: Function,
  ACTION_TOGGLE_MODAL: Function,
};

export type IToolbarsState = {
  expand: string,
  preview: ToolbarGroup,
  toolbars: ToolbarGroup,
  meta: ToolbarGroup,
  right: ToolbarGroup,
};
