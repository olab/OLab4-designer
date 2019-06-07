// @flow
import type { EdgeData as EdgeDataType } from '../../Constructor/Graph/Edge/types';
import type { ModalPosition as ModalPositionType } from '../types';

export type ILinkEditorProps = {
  ...ModalPositionType,
  link: EdgeDataType,
  isDragging: boolean;
  connectDragSource: Function;
  connectDragPreview: Function;
  ACTION_UPDATE_EDGE: Function;
  ACTION_DESELECT_ITEM: Function;
  ACTION_SET_POSITION_MODAL: Function;
};

export type ILinkEditorState = EdgeDataType;
