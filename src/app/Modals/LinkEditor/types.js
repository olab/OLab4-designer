// @flow
import type { EdgeData as EdgeDataType } from '../../Constructor/Graph/Edge/types';
import type { LinkEditorModal as LinkEditorModalType } from '../types';

export type ILinkEditorProps = {
  ...LinkEditorModalType,
  link: EdgeDataType,
  isDragging: boolean;
  connectDragSource: Function;
  connectDragPreview: Function;
  ACTION_UPDATE_EDGE: Function;
  ACTION_DESELECT_ITEM: Function;
  ACTION_SET_POSITION_LINK_EDITOR_MODAL: Function;
};

export type ILinkEditorState = EdgeDataType;
