// @flow
import type { NodeData as NodeDataType } from '../../Constructor/Graph/Node/types';
import type { NodeEditorModal as NodeEditorModalType } from '../types';

export type INodeEditorProps = {
  ...NodeEditorModalType,
  node: NodeDataType,
  isDragging: boolean;
  connectDragSource: Function;
  connectDragPreview: Function;
  ACTION_UPDATE_EDGE: Function;
  ACTION_DESELECT_ITEM: Function;
  ACTION_SET_POSITION_NODE_EDITOR_MODAL: Function;
};

export type INodeEditorState = NodeDataType;
