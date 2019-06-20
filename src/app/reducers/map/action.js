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
  EXCHANGE_NODE_ID,
  EXCHANGE_EDGE_ID,
  CREATE_NODE_WITH_EDGE,
  UPDATE_EDGE,
  RESET_MAP,
  RENAME_MAP,
  SAVE_MAP_TO_UNDO,
  UNDO_MAP,
  REDO_MAP,
  GET_MAP_FAILED,
  GET_MAP_SUCCEEDED,
  GET_MAP_REQUESTED,
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

  const { id: oldNodeId, x, y } = nodeData.data;

  return {
    type: CREATE_NODE,
    nodes: clonedNodes,
    oldNodeId,
    position: { x, y },
  };
};

export const ACTION_UPDATE_NODE_COLLAPSE = (nodeId: number) => {
  const { nodes } = store.getState().map;
  const clonedNodes = cloneDeep(nodes);
  const node = clonedNodes.find(({ data }) => data.id === nodeId);
  node.data.isCollapsed = !node.data.isCollapsed;

  return {
    type: UPDATE_NODE,
    nodes: clonedNodes,
    updatedNode: node.data,
  };
};

export const ACTION_UPDATE_NODE_LOCK = (nodeId: number) => {
  const { nodes } = store.getState().map;
  const clonedNodes = cloneDeep(nodes);
  const node = clonedNodes.find(({ data }) => data.id === nodeId);
  node.data.isLocked = !node.data.isLocked;

  return {
    type: UPDATE_NODE,
    nodes: clonedNodes,
    updatedNode: node.data,
  };
};

export const ACTION_CREATE_NODE_WITH_EDGE = (
  nodeData: NodeType,
  edgeData: EdgeType,
  sourceNodeId: number,
) => {
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
    sourceNodeId,
  };
};

export const ACTION_UPDATE_NODE_RESIZE = (nodeId: number, width: number, height: number) => {
  const { nodes } = store.getState().map;
  const clonedNodes = cloneDeep(nodes);
  const node = clonedNodes.find(({ data }) => data.id === nodeId);
  node.data.width = width;
  node.data.height = height;

  return {
    type: UPDATE_NODE,
    nodes: clonedNodes,
    updatedNode: node.data,
  };
};

export const ACTION_UPDATE_NODE = (nodeData: NodeDataType) => {
  const { nodes } = store.getState().map;
  const clonedNodes = cloneDeep(nodes);
  const i = clonedNodes.findIndex(({ data }) => data.id === nodeData.id);

  clonedNodes[i].data = nodeData;

  return {
    type: UPDATE_NODE,
    nodes: clonedNodes,
    updatedNode: nodeData,
  };
};

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

export const ACTION_EXCHANGE_NODE_ID = (oldNodeId: number | string, newNodeId: number) => {
  const { nodes, edges } = store.getState().map;
  const { clonedNodes, clonedEdges } = cloneDeep({
    clonedNodes: nodes,
    clonedEdges: edges,
  });

  const node = clonedNodes.find(({ data }) => data.id === oldNodeId);
  node.data.id = newNodeId;

  clonedEdges.forEach(({ data }) => {
    if (data.target === oldNodeId) {
      data.target = newNodeId;
    } else if (data.source === oldNodeId) {
      data.source = newNodeId;
    }
  });

  return {
    type: EXCHANGE_NODE_ID,
    nodes: clonedNodes,
    edges: clonedEdges,
  };
};

export const ACTION_EXCHANGE_EDGE_ID = (oldEdgeId: number | string, newEdgeId: number) => {
  const { map: { edges } } = store.getState();
  const clonedEdges = cloneDeep(edges);

  const edge = clonedEdges.find(({ data }) => data.id === oldEdgeId);
  edge.data.id = newEdgeId;

  return {
    type: EXCHANGE_EDGE_ID,
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

export const ACTION_GET_MAP_FAILED = () => ({
  type: GET_MAP_FAILED,
});

export const ACTION_GET_MAP_SUCCEEDED = (map: MapType) => ({
  type: GET_MAP_SUCCEEDED,
  map,
});

export const ACTION_GET_MAP_REQUESTED = (mapId: string) => ({
  type: GET_MAP_REQUESTED,
  mapId,
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
