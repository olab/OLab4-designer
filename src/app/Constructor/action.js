// @flow
import type { INode } from './Graph/Node/types';
import {
  type Node as NodeType,
  type Edge as EdgeType,
  SAVE_GRAPH_TO_UNDO,
  UNDO_GRAPH,
  REDO_GRAPH,
  SELECT_ITEM,
  COLLAPSE_NODE,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  CREATE_EDGE,
  DELETE_EDGE,
  SWAP_EDGE,
  SET_ZOOM_CONTROLS_REF,
} from './types';

export const ACTION_SAVE_GRAPH_TO_UNDO = () => ({
  type: SAVE_GRAPH_TO_UNDO,
});

export const ACTION_UNDO_GRAPH = () => ({
  type: UNDO_GRAPH,
});

export const ACTION_REDO_GRAPH = () => ({
  type: REDO_GRAPH,
});

export const ACTION_SELECT_ITEM = (id: number | null) => ({
  type: SELECT_ITEM,
  id,
});

export const ACTION_COLLAPSE_NODE = (id: number) => ({
  type: COLLAPSE_NODE,
  id,
});

export const ACTION_CREATE_NODE = (nodeData: NodeType) => ({
  type: CREATE_NODE,
  nodeData,
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

export const ACTION_SET_ZOOM_CONTROLS_REF = (ref: { current: null | HTMLDivElement }) => ({
  type: SET_ZOOM_CONTROLS_REF,
  ref,
});
