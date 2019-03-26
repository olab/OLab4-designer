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
};

export type Props = {
  fullscreenHandle: Function;
  isFullScreen: boolean;
  isUndoAvailable: boolean;
  isRedoAvailable: boolean;
  ACTION_UNDO_GRAPH: Function;
  ACTION_REDO_GRAPH: Function;
  ACTION_SET_ZOOM_CONTROLS_REF: (
    ref: { current: null | HTMLDivElement },
  ) => void;
};

export type State = {
  expand: string;
  preview: ToolbarGroup;
  toolbars: ToolbarGroup;
  meta: ToolbarGroup;
  right: ToolbarGroup;
};
