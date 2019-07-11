// @flow
import type { Edge as EdgeType } from '../../Constructor/Graph/Edge/types';
import type { Node as NodeType } from '../../Constructor/Graph/Node/types';

export type Position = {
  x: number,
  y: number,
};

export type MapItem = {
  nodes: Array<NodeType>,
  edges: Array<EdgeType>,
};

export type Map = {
  id: number | null,
  name: string,
  abstract: string,
  keywords: string,
  nodes: Array<NodeType>,
  edges: Array<EdgeType>,
  undo: Array<MapItem>,
  redo: Array<MapItem>,
  isEnabled: boolean,
  isFetching: boolean,
};

const SELECT_NODE = 'SELECT_NODE';
type SelectNode = {
  type: 'SELECT_NODE',
  nodes: Array<NodeType>,
};

const CREATE_NODE = 'CREATE_NODE';
type CreateNode = {
  type: 'CREATE_NODE',
  node: NodeType,
};

const CREATE_NODE_WITH_EDGE = 'CREATE_NODE_WITH_EDGE';
type CreateNodeWithEdge = {
  type: 'CREATE_NODE_WITH_EDGE',
  node: NodeType,
  edge: EdgeType,
  sourceNodeId: number,
};

const UPDATE_NODE = 'UPDATE_NODE';
type UpdateNode = {
  type: 'UPDATE_NODE',
  index: number,
  node: NodeType,
  isShowNotification: boolean,
};

const DELETE_NODE = 'DELETE_NODE';
type DeleteNode = {
  type: 'DELETE_NODE',
  nodeId: number,
  nodeIndex: number,
  edges: Array<EdgeType>,
};

const EXCHANGE_NODE_ID = 'EXCHANGE_NODE_ID';
type ExchangeNodeId = {
  type: 'EXCHANGE_NODE_ID',
  nodeIndex: number,
  node: NodeType,
  edges: Array<EdgeType>,
};

const EXCHANGE_EDGE_ID = 'EXCHANGE_EDGE_ID';
type ExchangeEdgeId = {
  type: 'EXCHANGE_EDGE_ID',
  index: number,
  edge: EdgeType,
};

const SELECT_EDGE = 'SELECT_EDGE';
type SelectEdge = {
  type: 'SELECT_EDGE',
  edges: Array<EdgeType>,
};

const CREATE_EDGE = 'CREATE_EDGE';
type CreateEdge = {
  type: 'CREATE_EDGE',
  edge: EdgeType,
};

const DELETE_EDGE = 'DELETE_EDGE';
type DeleteEdge = {
  type: 'DELETE_EDGE',
  index: number,
  edgeId: number,
  nodeId: number,
};

const UPDATE_EDGE = 'UPDATE_EDGE';
type UpdateEdge = {
  type: 'UPDATE_EDGE',
  index: number,
  edge: EdgeType,
};

const UPDATE_EDGE_VISUAL = 'UPDATE_EDGE_VISUAL';
type UpdateEdgeVisual = {
  type: 'UPDATE_EDGE_VISUAL',
  index: number,
  edge: EdgeType,
};

const RENAME_MAP = 'RENAME_MAP';
type RenameMap = {
  type: 'RENAME_MAP',
  name: string,
};

const EXTEND_MAP_REQUESTED = 'EXTEND_MAP_REQUESTED';
type ExtendMapRequested = {
  type: 'EXTEND_MAP_REQUESTED',
  templateId: number,
};

const EXTEND_MAP_FAILED = 'EXTEND_MAP_FAILED';
type ExtendMapFailed = {
  type: 'EXTEND_MAP_FAILED',
};

const EXTEND_MAP_SUCCEEDED = 'EXTEND_MAP_SUCCEEDED';
type ExtendMapSucceeded = {
  type: 'EXTEND_MAP_SUCCEEDED',
  nodes: Array<NodeType>,
  edges: Array<EdgeType>,
};

const SAVE_MAP_TO_UNDO = 'SAVE_MAP_TO_UNDO';
type MapToUndo = {
  type: 'SAVE_MAP_TO_UNDO',
  currentMap: MapItem,
};

const UNDO_MAP = 'UNDO_MAP';
type UndoMap = {
  type: 'UNDO_MAP',
  currentMap: MapItem,
  next: MapItem,
}

const REDO_MAP = 'REDO_MAP';
type RedoMap = {
  type: 'REDO_MAP',
  currentMap: MapItem,
  next: MapItem,
};

const GET_MAP_SUCCEEDED = 'GET_MAP_SUCCEEDED';
type GetMapSucceeded = {
  type: 'GET_MAP_SUCCEEDED',
  map: Map,
};

const GET_MAP_FAILED = 'GET_MAP_FAILED';
type GetMapFailed = {
  type: 'GET_MAP_FAILED',
};

const GET_MAP_REQUESTED = 'GET_MAP_REQUESTED';
type GetMapRequested = {
  type: 'GET_MAP_REQUESTED',
  mapId: string,
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

export type MapActions = SelectNode | SelectEdge |
  CreateNode | UpdateNode | DeleteNode |
  CreateEdge | DeleteEdge | UpdateEdge |
  RenameMap | MapToUndo | UndoMap | RedoMap | ExchangeNodeId |
  GetMapSucceeded | GetMapFailed | GetMapRequested |
  CreateMapFromTemplateRequested | CreateMapFromTemplateSucceeded |
  CreateMapFromTemplateFailed | CreateNodeWithEdge | ExchangeEdgeId |
  ExtendMapRequested | ExtendMapFailed | ExtendMapSucceeded |
  UpdateEdgeVisual;

export {
  SELECT_NODE,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  EXCHANGE_NODE_ID,
  EXCHANGE_EDGE_ID,
  SELECT_EDGE,
  CREATE_EDGE,
  DELETE_EDGE,
  UPDATE_EDGE,
  UPDATE_EDGE_VISUAL,
  CREATE_NODE_WITH_EDGE,
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
};
