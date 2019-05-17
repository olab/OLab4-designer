// @flow
import type { INode } from '../../Constructor/Graph/Node/types';
import {
  type Node as NodeType,
  type Edge as EdgeType,
  SELECT_ITEM,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  CREATE_EDGE,
  DELETE_EDGE,
  COLLAPSE_NODE,
  RESIZE_NODE,
  LOCK_NODE,
  CREATE_NODE_WITH_EDGE,
  UPDATE_EDGE,
  SWAP_EDGE,
  RESET_MAP,
  RENAME_MAP,
  SAVE_MAP_TO_UNDO,
  UNDO_MAP,
  REDO_MAP,
  CREATE_MAP_FROM_TEMPLATE,
} from './types';

export const ACTION_SELECT_ITEM = (id: number | null) => ({
  type: SELECT_ITEM,
  id,
});

export const ACTION_CREATE_NODE = (nodeData: NodeType) => ({
  type: CREATE_NODE,
  nodeData,
});

export const ACTION_COLLAPSE_NODE = (id: number, width: number, height: number) => ({
  type: COLLAPSE_NODE,
  id,
  width,
  height,
});

export const ACTION_LOCK_NODE = (id: number) => ({
  type: LOCK_NODE,
  id,
});

export const ACTION_RESIZE_NODE = (id: number, width: number, height: number) => ({
  type: RESIZE_NODE,
  width,
  height,
  id,
});

export const ACTION_CREATE_NODE_WITH_EDGE = (nodeData: NodeType, edgeData: EdgeType) => ({
  type: CREATE_NODE_WITH_EDGE,
  nodeData,
  edgeData,
});

export const ACTION_UPDATE_NODE = (nodeData: INode) => ({
  type: UPDATE_NODE,
  nodeData,
});

export const ACTION_DELETE_NODE = (nodeId: number) => ({
  type: DELETE_NODE,
  nodeId,
});

export const ACTION_CREATE_EDGE = (edgeData: EdgeType) => ({
  type: CREATE_EDGE,
  edgeData,
});

export const ACTION_UPDATE_EDGE = (edgeData: EdgeDataType) => ({
  type: UPDATE_EDGE,
  edgeData,
});

export const ACTION_DELETE_EDGE = (edgeId: number) => ({
  type: DELETE_EDGE,
  edgeId,
});

export const ACTION_SWAP_EDGE = (edgeId: number, sourceNodeId: number, targetNodeId: number) => ({
  type: SWAP_EDGE,
  edgeId,
  sourceNodeId,
  targetNodeId,
});

export const ACTION_RESET_MAP = () => ({
  type: RESET_MAP,
});

export const ACTION_RENAME_MAP = (name: string) => ({
  type: RENAME_MAP,
  name,
});

export const ACTION_SAVE_MAP_TO_UNDO = () => ({
  type: SAVE_MAP_TO_UNDO,
});

export const ACTION_UNDO_MAP = () => ({
  type: UNDO_MAP,
});

export const ACTION_REDO_MAP = () => ({
  type: REDO_MAP,
});

export const ACTION_CREATE_MAP_FROM_TEMPLATE = (templateName: string) => ({
  type: CREATE_MAP_FROM_TEMPLATE,
  templateName,
});
