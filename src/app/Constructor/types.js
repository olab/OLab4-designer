// @flow
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
  isCollapsed: boolean,
  isLocked: boolean,
};

export type Node = {
  id: number,
  isSelected: boolean,
  data: NodeData,
};

export type GraphItem = {
  nodes: Array<Node>,
  edges: Array<Edge>,
};

export type IConstructorProps = {};
export type IConstructorState = {
  isFullScreen: boolean;
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

const COLLAPSE_NODE = 'COLLAPSE_NODE';

type CollapseItem = {
  type: 'COLLAPSE_NODE',
  id: number,
};

const LOCK_NODE = 'LOCK_NODE';

type LockItem = {
  type: 'LOCK_NODE',
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
  nodeData: Node,
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

const CREATE_NODE_WITH_EDGE = 'CREATE_NODE_WITH_EDGE';

type CreateNodeWithEdge = {
  type: 'CREATE_NODE_WITH_EDGE',
  nodeData: Node,
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
  CollapseItem | CreateNode | UpdateNode |
  DeleteNode | CreateEdge | DeleteEdge |
  SwapEdge | LockItem | SetZoomControlsRef |
  CreateNodeWithEdge;

export {
  SAVE_GRAPH_TO_UNDO,
  UNDO_GRAPH,
  REDO_GRAPH,
  SELECT_ITEM,
  COLLAPSE_NODE,
  LOCK_NODE,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  CREATE_EDGE,
  DELETE_EDGE,
  SWAP_EDGE,
  CREATE_NODE_WITH_EDGE,
  SET_ZOOM_CONTROLS_REF,

};
