// @flow
import type { Node as NodeType } from '../../Constructor/Graph/Node/types';
import type { ModalPosition as ModalPositionType } from '../types';

export type INodeEditorProps = {
  ...ModalPositionType,
  node: NodeType,
  isDragging: boolean;
  connectDragSource: Function;
  connectDragPreview: Function;
  ACTION_UPDATE_NODE: Function;
  ACTION_DESELECT_NODE: Function;
  ACTION_SET_POSITION_MODAL: Function;
};

export type INodeEditorState = NodeType;
