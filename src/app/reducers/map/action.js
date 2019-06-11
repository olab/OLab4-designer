// @flow
import cloneDeep from 'lodash.clonedeep';
import store from '../../../store/store';

import type { NodeData as NodeDataType } from '../../Constructor/Graph/Node/types';
import type { EdgeData as EdgeDataType } from '../../Constructor/Graph/Edge/types';
import {
  type Node as NodeType,
  type Edge as EdgeType,
  type Map as MapType,
  SELECT_ITEM,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  CREATE_EDGE,
  DELETE_EDGE,
  COLLAPSE_NODE,
  RESIZE_NODE,
  LOCK_NODE,
  EXCHANGE_NODE_ID,
  CREATE_NODE_WITH_EDGE,
  UPDATE_EDGE,
  RESET_MAP,
  RENAME_MAP,
  SAVE_MAP_TO_UNDO,
  UNDO_MAP,
  REDO_MAP,
  CREATE_MAP_FAILED,
  CREATE_MAP_SUCCEEDED,
  CREATE_MAP_REQUESTED,
} from './types';

export const ACTION_SELECT_ITEM = (id: number | null) => ({
  type: SELECT_ITEM,
  id,
});

export const ACTION_CREATE_NODE = (nodeData: NodeType) => {
  const { nodes } = store.getState().map;
  const clonedNodes = cloneDeep(nodes);
  clonedNodes.push(nodeData);

  return {
    type: CREATE_NODE,
    nodes: clonedNodes,
    oldId: nodeData.data.id,
  };
};

export const ACTION_COLLAPSE_NODE = (id: number) => ({
  type: COLLAPSE_NODE,
  id,
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

export const ACTION_CREATE_NODE_WITH_EDGE = (nodeData: NodeType, edgeData: EdgeType) => {
  const { nodes, edges } = store.getState().map;
  const {
    nodes: clonedNodes,
    edges: clonedEdges,
  } = cloneDeep({ nodes, edges });

  clonedNodes.push(nodeData);
  clonedEdges.push(edgeData);

  return {
    type: CREATE_NODE_WITH_EDGE,
    nodes: clonedNodes,
    edges: clonedEdges,
    nodeData,
    edgeData,
  };
};

export const ACTION_UPDATE_NODE = (nodeData: NodeDataType) => ({
  type: UPDATE_NODE,
  nodeData,
});

export const ACTION_DELETE_NODE = (nodeId: number) => {
  const { nodes, edges } = store.getState().map;
  const {
    nodes: clonedNodes,
    edges: clonedEdges,
  } = cloneDeep({ nodes, edges });

  const newNodes = clonedNodes.filter(({ data }) => data.id !== nodeId);
  const newEdges = clonedEdges.filter(({ data }) => (
    data.source !== nodeId && data.target !== nodeId
  ));

  return {
    type: DELETE_NODE,
    nodes: newNodes,
    edges: newEdges,
    nodeId,
  };
};

export const ACTION_EXCHANGE_NODE_ID = (oldId: number | string, newId: number) => {
  const { nodes, edges } = store.getState().map;
  const { clonedNodes, clonedEdges } = cloneDeep({
    clonedNodes: nodes,
    clonedEdges: edges,
  });

  const node = clonedNodes.find(({ data }) => data.id === oldId);
  node.data.id = newId;

  clonedEdges.forEach(({ data }) => {
    if (data.target === oldId) {
      data.target = newId;
    } else if (data.source === oldId) {
      data.source = newId;
    }
  });

  return {
    type: EXCHANGE_NODE_ID,
    nodes: clonedNodes,
    edges: clonedEdges,
  };
};

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

export const ACTION_CREATE_MAP_FAILED = () => ({
  type: CREATE_MAP_FAILED,
});

export const ACTION_CREATE_MAP_SUCCEEDED = (map: MapType) => ({
  type: CREATE_MAP_SUCCEEDED,
  map,
});

export const ACTION_CREATE_MAP_REQUESTED = (templateId?: number) => ({
  type: CREATE_MAP_REQUESTED,
  templateId,
});
