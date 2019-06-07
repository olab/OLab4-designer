// @flow
import type { NodeData as NodeDataType } from '../../Constructor/Graph/Node/types';
import type { ModalPosition as ModalPositionType } from '../types';

export type INodeEditorProps = {
  ...ModalPositionType,
  node: NodeDataType,
  isDragging: boolean;
  connectDragSource: Function;
  connectDragPreview: Function;
  ACTION_UPDATE_EDGE: Function;
  ACTION_DESELECT_ITEM: Function;
  ACTION_SET_POSITION_MODAL: Function;
};

export type INodeEditorState = NodeDataType;
