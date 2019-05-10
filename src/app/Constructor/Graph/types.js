// @flow
import type { IEdge } from './Edge/types';
import type { INode } from './Node/types';
import type { LayoutEngine as LayoutEngineType } from './utilities/layout-engine/layout-engine-config';
import type {
  Node as NodeType,
  Edge as EdgeType,
  GraphItem as GraphItemType,
} from '../types';

export type IGraphProps = {
  isFullScreen: boolean,
  minZoom: number,
  maxZoom: number,
  graph: GraphItemType,
  isUndoAvailable: boolean,
  isRedoAvailable: boolean,
  layoutEngineType: string,
  connectDropTarget: Function,
  ACTION_UNDO_GRAPH: () => void,
  ACTION_REDO_GRAPH: () => void,
  ACTION_SELECT_ITEM: (id: number | null) => void,
  ACTION_COLLAPSE_NODE: (id: number) => void,
  ACTION_LOCK_NODE: (id: number) => void,
  ACTION_CREATE_NODE: (nodeData: NodeType) => void,
  ACTION_CREATE_NODE_WITH_EDGE: (nodeData: NodeType, edgeData: EdgeType)=> void,
  ACTION_CREATE_EDGE: (edgeData: EdgeType) => void,
  ACTION_UPDATE_NODE: (nodeData: INode) => void,
  ACTION_DELETE_NODE: (nodeId: number) => void,
  ACTION_DELETE_EDGE: (edges: Array<IEdge>) => void,
  ACTION_SWAP_EDGE: (edge: IEdge, edge: IEdge, edge: IEdge) => void,
};

export type IGraphState = {
  layoutEngineType: LayoutEngineType;
  copiedNode: NodeType;
};
