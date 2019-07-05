// @flow
import type { EdgeData as EdgeDataType } from '../../Constructor/Graph/Edge/types';
import type { NodeData as NodeDataType } from '../../Constructor/Graph/Node/types';

export type Position = {
  x: number,
  y: number,
};

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

const SELECT_ITEM = 'SELECT_ITEM';
type SelectItem = {
  type: 'SELECT_ITEM',
  id?: number,
};

const CREATE_NODE = 'CREATE_NODE';
type CreateNode = {
  type: 'CREATE_NODE',
  nodes: Array<Node>,
  oldNodeId: string,
  position: Position,
};

const CREATE_NODE_WITH_EDGE = 'CREATE_NODE_WITH_EDGE';
type CreateNodeWithEdge = {
  type: 'CREATE_NODE_WITH_EDGE',
  nodes: Array<Node>,
  edges: Array<Edge>,
  nodeData: Node,
  edgeData: Edge,
  sourceNodeId: number,
};

const UPDATE_NODE = 'UPDATE_NODE';
type UpdateNode = {
  type: 'UPDATE_NODE',
  nodes: Array<Node>,
  updatedNode: NodeDataType,
};

const DELETE_NODE = 'DELETE_NODE';
type DeleteNode = {
  type: 'DELETE_NODE',
  nodes: Array<Node>,
  edges: Array<Edge>,
  nodeId: number,
};

const EXCHANGE_NODE_ID = 'EXCHANGE_NODE_ID';
type ExchangeNodeId = {
  type: 'EXCHANGE_NODE_ID',
  nodes: Array<Node>,
  edges: Array<Edge>,
};

const EXCHANGE_EDGE_ID = 'EXCHANGE_EDGE_ID';
type ExchangeEdgeId = {
  type: 'EXCHANGE_EDGE_ID',
  edges: Array<Edge>,
};

const CREATE_EDGE = 'CREATE_EDGE';
type CreateEdge = {
  type: 'CREATE_EDGE',
  nodes: Array<Node>,
  edges: Array<Edge>,
  edgeData: Edge,
};

const DELETE_EDGE = 'DELETE_EDGE';
type DeleteEdge = {
  type: 'DELETE_EDGE',
  edges: Array<Edge>,
};

const UPDATE_EDGE = 'UPDATE_EDGE';
type UpdateEdge = {
  type: 'UPDATE_EDGE',
  edges: Array<Edge>,
  updatedEdge: EdgeDataType,
};

const UPDATE_EDGE_VISUAL = 'UPDATE_EDGE_VISUAL';
type UpdateEdgeVisual = {
  type: 'UPDATE_EDGE_VISUAL',
  edges: Array<Edge>,
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
  nodes: Array<Node>,
  edges: Array<Edge>,
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

export type MapActions = SelectItem |
  CreateNode | UpdateNode | DeleteNode |
  CreateEdge | DeleteEdge | UpdateEdge |
  ResetMap | RenameMap | MapToUndo |
  UndoMap | RedoMap | ExchangeNodeId |
  GetMapSucceeded | GetMapFailed | GetMapRequested |
  CreateMapFromTemplateRequested | CreateMapFromTemplateSucceeded |
  CreateMapFromTemplateFailed | CreateNodeWithEdge | ExchangeEdgeId |
  ExtendMapRequested | ExtendMapFailed | ExtendMapSucceeded |
  UpdateEdgeVisual;

export {
  SELECT_ITEM,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  EXCHANGE_NODE_ID,
  EXCHANGE_EDGE_ID,
  CREATE_EDGE,
  DELETE_EDGE,
  UPDATE_EDGE,
  UPDATE_EDGE_VISUAL,
  CREATE_NODE_WITH_EDGE,
  RESET_MAP,
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
