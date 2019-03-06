// @flow

import type { ToolbarGroup as ToolbarGroupType } from '../../../store/initialState';


export type Props = {
  fullscreenHandle: Function,
  isFullScreen: boolean,
};

export type State = {
  expand: string,
  preview: ToolbarGroupType,
  toolbars: ToolbarGroupType,
  history: ToolbarGroupType,
  meta: ToolbarGroupType,
  right: ToolbarGroupType,
};
