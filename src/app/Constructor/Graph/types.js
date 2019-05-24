// @flow
import type { EdgeData as EdgeDataType } from './Edge/types';
import type { INode } from './Node/types';
import type { LayoutEngine as LayoutEngineType } from './utilities/layout-engine/layout-engine-config';
import type {
  Node as NodeType,
  Edge as EdgeType,
  MapItem as MapItemType,
} from '../types';

export type IGraphProps = {
  isFullScreen: boolean,
  minZoom: number,
  maxZoom: number,
  graph: MapItemType,
  isUndoAvailable: boolean,
  isRedoAvailable: boolean,
  layoutEngineType: string,
  connectDropTarget: Function,
  ACTION_SET_POSITION_LINK_EDITOR_MODAL: (x: number, y: number) => void,
  ACTION_SET_POSITION_NODE_EDITOR_MODAL: (x: number, y: number) => void,
  ACTION_UNDO_MAP: () => void,
  ACTION_REDO_MAP: () => void,
  ACTION_RESET_MAP: () => void,
  ACTION_SELECT_ITEM: (id: number | null) => void,
  ACTION_COLLAPSE_NODE: (id: number) => void,
  ACTION_RESIZE_NODE: (id: number, width: number, height: number) => void,
  ACTION_LOCK_NODE: (id: number) => void,
  ACTION_CREATE_NODE: (nodeData: NodeType) => void,
  ACTION_CREATE_NODE_WITH_EDGE: (nodeData: NodeType, edgeData: EdgeType)=> void,
  ACTION_CREATE_EDGE: (edgeData: EdgeType) => void,
  ACTION_UPDATE_NODE: (nodeData: INode) => void,
  ACTION_DELETE_NODE: (nodeId: number) => void,
  ACTION_DELETE_EDGE: (edgeId: number) => void,
  ACTION_SWAP_EDGE: (edge: EdgeDataType, edge: EdgeDataType, edge: EdgeDataType) => void,
};

export type IGraphState = {
  layoutEngineType: LayoutEngineType;
  copiedNode: NodeType;
};
