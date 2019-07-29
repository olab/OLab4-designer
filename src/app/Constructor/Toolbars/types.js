// @flow
export type ToolbarItem = {
  id: string,
  icon: any,
  label: string,
  onClick: Function,
};

export type ToolbarGroup = {
  id: string,
  itemList: Array<ToolbarItem>,
};

export type IToolbarsProps = {
  classes: any,
  showModal: Function,
  isFullScreen: boolean,
  isUndoAvailable: boolean,
  isRedoAvailable: boolean,
  ACTION_UNDO_MAP: Function,
  ACTION_REDO_MAP: Function,
  ACTION_TOGGLE_FULLSCREEN: Function,
  ACTION_TOGGLE_MODAL: Function,
};

export type IToolbarsState = {
  toolbarRight: ToolbarGroup,
  toolbarLeft: ToolbarGroup,
};
