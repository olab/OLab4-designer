// @flow
import type { EdgeData as EdgeDataType } from '../../Constructor/Graph/Edge/types';
import type { NodeData as NodeDataType } from '../../Constructor/Graph/Node/types';

export type Edge = {
  isSelected: boolean,
  data: EdgeDataType,
};

export type Node = {
  isSelected: boolean,
  data: NodeDataType,
};

export type MapItem = {
  nodes: Array<Node>,
  edges: Array<Edge>,
};

export type Map = {
  id: number | null,
  name: string,
  abstract: string,
  keywords: string,
  enabled: boolean,
  isFetching: boolean,
  nodes: Array<Node>,
  edges: Array<Edge>,
  undo: Array<MapItem>,
  redo: Array<MapItem>,
};


// reducer types
const SELECT_ITEM = 'SELECT_ITEM';
type SelectItem = {
  type: 'SELECT_ITEM',
  id?: number,
};

const CREATE_NODE = 'CREATE_NODE';
type CreateNode = {
  type: 'CREATE_NODE',
  nodeData: Node,
};

const COLLAPSE_NODE = 'COLLAPSE_NODE';
type CollapseNode = {
  type: 'COLLAPSE_NODE',
  id: number,
};

const LOCK_NODE = 'LOCK_NODE';
type LockNode = {
  type: 'LOCK_NODE',
  id: number,
};

const RESIZE_NODE = 'RESIZE_NODE';
type ResizeNode = {
  type: 'RESIZE_NODE',
  width: number,
  height: number,
  id: number,
}

const CREATE_NODE_WITH_EDGE = 'CREATE_NODE_WITH_EDGE';
type CreateNodeWithEdge = {
  type: 'CREATE_NODE_WITH_EDGE',
  nodeData: Node,
  edgeData: Edge,
};

const UPDATE_NODE = 'UPDATE_NODE';
type UpdateNode = {
  type: 'UPDATE_NODE',
  nodeData: NodeDataType,
};

const DELETE_NODE = 'DELETE_NODE';
type DeleteNode = {
  type: 'DELETE_NODE',
  nodeId: number,
};

const CREATE_EDGE = 'CREATE_EDGE';
type CreateEdge = {
  type: 'CREATE_EDGE',
  edgeData: Edge,
};

const DELETE_EDGE = 'DELETE_EDGE';
type DeleteEdge = {
  type: 'DELETE_EDGE',
  edgeId: number,
};

const UPDATE_EDGE = 'UPDATE_EDGE';
type UpdateEdge = {
  type: 'UPDATE_EDGE',
  edgeData: EdgeDataType,
};

const SWAP_EDGE = 'SWAP_EDGE';
type SwapEdge = {
  type: 'SWAP_EDGE',
  edgeId: number,
  sourceNodeId: number,
  targetNodeId: number,
};

const RESET_MAP = 'RESET_MAP';
type ResetMap = {
  type: 'RESET_MAP',
};

const RENAME_MAP = 'RENAME_MAP';
type RenameMap = {
  type: 'RENAME_MAP',
  name: string,
};

const SAVE_MAP_TO_UNDO = 'SAVE_MAP_TO_UNDO';
type MapToUndo = {
  type: 'SAVE_MAP_TO_UNDO',
};

const UNDO_MAP = 'UNDO_MAP';
type UndoMap = {
  type: 'UNDO_MAP',
};

const REDO_MAP = 'REDO_MAP';
type RedoMap = {
  type: 'REDO_MAP',
};

const CREATE_MAP_SUCCEEDED = 'CREATE_MAP_SUCCEEDED';
type CreateMapFromTemplateSucceeded = {
  type: 'CREATE_MAP_SUCCEEDED',
  map: Map,
};

const CREATE_MAP_FAILED = 'CREATE_MAP_FAILED';
type CreateMapFromTemplateFailed = {
  type: 'CREATE_MAP_FAILED',
};

const CREATE_MAP_REQUESTED = 'CREATE_MAP_REQUESTED';
type CreateMapFromTemplateRequested = {
  type: 'CREATE_MAP_REQUESTED',
  templateId?: number,
};

export type MapActions = SelectItem |
  CreateNode | UpdateNode | DeleteNode |
  CreateEdge | DeleteEdge | SwapEdge |
  ResetMap | RenameMap | MapToUndo |
  UndoMap | RedoMap | CreateNodeWithEdge |
  ResizeNode | UpdateEdge | CollapseNode |
  LockNode | CreateMapFromTemplateRequested |
  CreateMapFromTemplateSucceeded | CreateMapFromTemplateFailed;

export {
  SELECT_ITEM,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  COLLAPSE_NODE,
  LOCK_NODE,
  RESIZE_NODE,
  CREATE_EDGE,
  DELETE_EDGE,
  UPDATE_EDGE,
  SWAP_EDGE,
  CREATE_NODE_WITH_EDGE,
  RESET_MAP,
  RENAME_MAP,
  SAVE_MAP_TO_UNDO,
  UNDO_MAP,
  REDO_MAP,
  CREATE_MAP_FAILED,
  CREATE_MAP_SUCCEEDED,
  CREATE_MAP_REQUESTED,
};
