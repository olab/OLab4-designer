// @flow
import type { IEdge } from './Graph/Edge/types';
import type { INode } from './Graph/Node/types';
import type { LayoutEngine as LayoutEngineType } from './Graph/utilities/layout-engine/layout-engine-config';

export type EdgeData = {
  id: number,
  handleText: string,
  source: number,
  target: number,
};

export type Edge = {
  isSelected: boolean,
  data: EdgeData,
};

export type NodeData = {
  id: number,
  map_id: number,
  title: string,
  type_id: number,
  x: number,
  y: number,
  color: string,
  text: string,
  links: Array<{}>,
  destination_id: number,
  style_id: number,
  type_id: number,
};

export type Node = {
  isSelected: boolean,
  expand: boolean,
  locked: boolean,
  data: NodeData,
};

export type GraphItem = {
  nodes: Array<Node>,
  edges: Array<Edge>,
};

export type Constructor = {
  currentTool: string,
  layoutEngineType: 'None' | 'SnapToGrid' | 'VerticalTree',
  zoom: {
    index: number,
    zoomStep: number,
    maxZoom: number,
    minZoom: number,
    zoomControlsRef: {
      current: HTMLDivElement | null,
    },
  },
  autoSave: {
    enabled: boolean,
    interval: number,
  },
  graph: {
    undo: Array<GraphItem>,
    current: GraphItem,
    redo: Array<GraphItem>,
  },
};

export type IGraphProps = {
  isFullScreen: boolean,
  minZoom: number,
  maxZoom: number,
  graph: GraphItem,
  isUndoAvailable: boolean,
  isRedoAvailable: boolean,
  layoutEngineType: string,
  ACTION_UNDO_GRAPH: () => void,
  ACTION_REDO_GRAPH: () => void,
  ACTION_SELECT_ITEM: (id: number | null) => void,
  ACTION_CREATE_NODE: (nodeData: Node) => void,
  ACTION_CREATE_EDGE: (edgeData: Edge) => void,
  ACTION_UPDATE_NODE: (nodeData: INode) => void,
  ACTION_DELETE_NODE: (nodeId: number) => void,
  ACTION_DELETE_EDGE: (edges: Array<IEdge>) => void,
  ACTION_SWAP_EDGE: (edge: IEdge) => void,
};

export type IGraphState = {
  layoutEngineType: LayoutEngineType;
  copiedNode?: Node;
};

// reducer types
const SAVE_GRAPH_TO_UNDO = 'SAVE_GRAPH_TO_UNDO';
type GraphToUndo = {
  type: 'SAVE_GRAPH_TO_UNDO',
};

const UNDO_GRAPH = 'UNDO_GRAPH';
type UndoGraph = {
  type: 'UNDO_GRAPH',
};

const REDO_GRAPH = 'REDO_GRAPH';
type RedoGraph = {
  type: 'REDO_GRAPH',
};

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

const UPDATE_NODE = 'UPDATE_NODE';
type UpdateNode = {
  type: 'UPDATE_NODE',
  nodeData: INode,
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

const SWAP_EDGE = 'SWAP_EDGE';
type SwapEdge = {
  type: 'SWAP_EDGE',
  edgeId: number,
  sourceNodeId: number,
  targetNodeId: number,
};

const SET_ZOOM_CONTROLS_REF = 'SET_ZOOM_CONTROLS_REF';
type SetZoomControlsRef = {
  type: 'SET_ZOOM_CONTROLS_REF',
  ref: { current: null | HTMLDivElement },
};

export type GraphActions = GraphToUndo |
  UndoGraph | RedoGraph | SelectItem |
  CreateNode | UpdateNode | DeleteNode |
  CreateEdge | DeleteEdge | SwapEdge |
  SetZoomControlsRef;

export {
  SAVE_GRAPH_TO_UNDO,
  UNDO_GRAPH,
  REDO_GRAPH,
  SELECT_ITEM,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  CREATE_EDGE,
  DELETE_EDGE,
  SWAP_EDGE,
  SET_ZOOM_CONTROLS_REF,
};
