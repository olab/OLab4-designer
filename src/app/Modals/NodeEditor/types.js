// @flow
import type { Node as NodeType } from '../../Constructor/Graph/Node/types';
import type { ModalPosition as ModalPositionType } from '../types';

export type INodeEditorProps = {
  ...ModalPositionType,
  classes: {
    [props: string]: any,
  },
  node: NodeType,
  isDragging: boolean;
  connectDragSource: Function;
  connectDragPreview: Function;
  ACTION_UPDATE_NODE: Function;
  ACTION_UNFOCUS_NODE: Function;
  ACTION_SET_POSITION_MODAL: Function;
  ACTION_TOGGLE_SO_PICKER_MODAL: Function;
};

export type INodeEditorState = NodeType;
