// @flow

import type { ToolbarGroup as ToolbarGroupType } from '../../../types';

export type Props = {
  fullscreenHandle: Function,
  isFullScreen: boolean,
  isUndoAvailable: boolean,
  isRedoAvailable: boolean,
  ACTION_UNDO_GRAPH: () => void,
  ACTION_REDO_GRAPH: () => void,
  ACTION_SET_ZOOM_CONTROLS_REF: (
    ref: { current: null | HTMLDivElement },
  ) => void,
};

export type State = {
  expand: string,
  preview: ToolbarGroupType,
  toolbars: ToolbarGroupType,
  history: ToolbarGroupType,
  meta: ToolbarGroupType,
  right: ToolbarGroupType,
};
