// @flow
import cloneDeep from 'lodash.clonedeep';
import store from '../../../store/store';

import type { Node as NodeType } from '../../Constructor/Graph/Node/types';
import type { Edge as EdgeType } from '../../Constructor/Graph/Edge/types';
import {
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
  UPDATE_EDGE_VISUAL,
  RENAME_MAP,
  EXTEND_MAP_REQUESTED,
  EXTEND_MAP_FAILED,
  EXTEND_MAP_SUCCEEDED,
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

export const ACTION_SELECT_ITEM = (id: number | null) => {
  const { map: { nodes, edges } } = store.getState();
  const clonedEdges = cloneDeep(edges);
  const clonedNodes = cloneDeep(nodes);

  [...clonedNodes, ...clonedEdges].map((item) => {
    if (id) {
      item.isSelected = item.id === id;
    } else {
      item.isSelected = false;
    }

    return item;
  });

  return {
    type: SELECT_ITEM,
    id,
    nodes: clonedNodes,
    edges: clonedEdges,
  };
};

export const ACTION_CREATE_NODE = (nodeData: NodeType) => {
  const { map: { nodes } } = store.getState();
  const { id: oldNodeId, x, y } = nodeData;
  const clonedNodes = cloneDeep(nodes);
  clonedNodes.push(nodeData);

  return {
    type: CREATE_NODE,
    nodes: clonedNodes,
    oldNodeId,
    position: { x, y },
  };
};

export const ACTION_UPDATE_NODE_COLLAPSE = (nodeId: number) => {
  const { map: { nodes } } = store.getState();
  const clonedNodes = cloneDeep(nodes);
  const node = clonedNodes.find(({ id }) => id === nodeId);
  node.isCollapsed = !node.isCollapsed;

  return {
    type: UPDATE_NODE,
    nodes: clonedNodes,
    updatedNode: node,
  };
};

export const ACTION_UPDATE_NODE_LOCK = (nodeId: number) => {
  const { map: { nodes } } = store.getState();

  let updatedNode;
  const newNodes = nodes.map((node) => {
    if (node.id !== nodeId) {
      return node;
    }

    updatedNode = {
      ...node,
      isLocked: !node.isLocked,
    };

    return updatedNode;
  });

  return {
    type: UPDATE_NODE,
    nodes: newNodes,
    updatedNode,
  };
};

export const ACTION_CREATE_NODE_WITH_EDGE = (
  nodeData: NodeType,
  edgeData: EdgeType,
  sourceNodeId: number,
) => {
  const { map: { nodes, edges } } = store.getState();
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
  const { map: { nodes } } = store.getState();

  let updatedNode;
  const newNodes = nodes.map((node) => {
    if (node.id !== nodeId) {
      return node;
    }

    updatedNode = {
      ...node,
      width,
      height,
    };

    return updatedNode;
  });

  return {
    type: UPDATE_NODE,
    nodes: newNodes,
    updatedNode,
  };
};

export const ACTION_UPDATE_NODE = (nodeData: NodeType) => {
  const { map: { nodes } } = store.getState();
  const clonedNodes = cloneDeep(nodes);
  const i = clonedNodes.findIndex(({ id }) => id === nodeData.id);

  clonedNodes[i] = nodeData;

  return {
    type: UPDATE_NODE,
    nodes: clonedNodes,
    updatedNode: nodeData,
  };
};

export const ACTION_DELETE_NODE = (nodeId: number) => {
  const { map: { nodes, edges } } = store.getState();

  const newNodes = nodes.filter(({ id }) => id !== nodeId);
  const newEdges = edges.filter(({ source, target }) => (
    source !== nodeId && target !== nodeId
  ));

  return {
    type: DELETE_NODE,
    nodes: newNodes,
    edges: newEdges,
    nodeId,
  };
};

export const ACTION_EXCHANGE_NODE_ID = (oldNodeId: number | string, newNodeId: number) => {
  const { map: { nodes, edges } } = store.getState();
  const { clonedNodes, clonedEdges } = cloneDeep({
    clonedNodes: nodes,
    clonedEdges: edges,
  });

  const node = clonedNodes.find(({ id }) => id === oldNodeId);
  node.id = newNodeId;

  clonedEdges.forEach(({ target, source }) => {
    if (target === oldNodeId) {
      target = newNodeId;
    } else if (source === oldNodeId) {
      source = newNodeId;
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

  const edge = clonedEdges.find(({ id }) => id === oldEdgeId);
  edge.id = newEdgeId;

  return {
    type: EXCHANGE_EDGE_ID,
    edges: clonedEdges,
  };
};

export const ACTION_CREATE_EDGE = (
  edgeData: EdgeType,
) => {
  const { map: { nodes: newNodes, edges: newEdges } } = store.getState();
  const graph = cloneDeep([newNodes, newEdges]);
  graph.forEach((items) => {
    items.forEach((item) => {
      item.isSelected = false;
    });
  });

  const [nodes, edges] = graph;
  edges.push(edgeData);

  return {
    type: CREATE_EDGE,
    nodes,
    edges,
    edgeData,
  };
};

export const ACTION_UPDATE_EDGE = (edgeData: EdgeType) => {
  const { map: { edges } } = store.getState();
  const clonedEdges = cloneDeep(edges);
  const edge = clonedEdges.find(({ id }) => id === edgeData.id);
  Object.assign(edge, edgeData);

  return {
    type: UPDATE_EDGE,
    edges: clonedEdges,
    updatedEdge: edgeData,
  };
};

export const ACTION_UPDATE_EDGE_VISUAL = (edgeData: EdgeType) => {
  const { map: { edges } } = store.getState();
  const clonedEdges = cloneDeep(edges);
  const edge = clonedEdges.find(({ id }) => id === edgeData.id);
  Object.assign(edge, edgeData);

  return {
    type: UPDATE_EDGE_VISUAL,
    edges: clonedEdges,
  };
};

export const ACTION_DELETE_EDGE = (edgeId: number, nodeId: number) => {
  const { map: { edges } } = store.getState();
  const clonedEdges = cloneDeep(edges);
  const newEdges = clonedEdges.filter(({ id }) => id !== edgeId);

  return {
    type: DELETE_EDGE,
    edges: newEdges,
    edgeId,
    nodeId,
  };
};


export const ACTION_RENAME_MAP = (name: string) => ({
  type: RENAME_MAP,
  name,
});

export const ACTION_SAVE_MAP_TO_UNDO = () => {
  const { map: { nodes, edges } } = store.getState();
  const currentMap = cloneDeep({ nodes, edges });

  return {
    type: SAVE_MAP_TO_UNDO,
    currentMap,
  };
};

export const ACTION_UNDO_MAP = () => {
  const { map: { undo, nodes, edges } } = store.getState();
  const prev = cloneDeep(undo[undo.length - 1]);
  const currentMap = cloneDeep({ nodes, edges });

  return {
    type: UNDO_MAP,
    currentMap,
    prev,
  };
};

export const ACTION_REDO_MAP = () => {
  const { map: { redo, nodes, edges } } = store.getState();
  const next = cloneDeep(redo[redo.length - 1]);
  const currentMap = cloneDeep({ nodes, edges });

  return {
    type: REDO_MAP,
    currentMap,
    next,
  };
};

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

export const ACTION_EXTEND_MAP_REQUESTED = (templateId: number) => ({
  type: EXTEND_MAP_REQUESTED,
  templateId,
});

export const ACTION_EXTEND_MAP_FAILED = () => ({
  type: EXTEND_MAP_FAILED,
});

export const ACTION_EXTEND_MAP_SUCCEEDED = (
  nodes: Array<NodeType>,
  edges: Array<EdgeType>,
) => ({
  type: EXTEND_MAP_SUCCEEDED,
  nodes,
  edges,
});
