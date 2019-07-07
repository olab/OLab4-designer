// @flow
import type { LayoutEngine as LayoutEngineType } from './utilities/layout-engine/layout-engine-config';
import type { Node as NodeType } from './Node/types';
import type { Edge as EdgeType } from './Edge/types';
import type { Defaults as DefaultsType } from '../../reducers/defaults/types';
import type { Map as MapType } from '../../reducers/map/types';

export type IGraphProps = {
  isFullScreen: boolean,
  minZoom: number,
  maxZoom: number,
  map: MapType,
  isUndoAvailable: boolean,
  isRedoAvailable: boolean,
  layoutEngineType: string,
  connectDropTarget: Function,
  ACTION_SET_POSITION_MODAL: (modalName: string, x: number, y: number) => void,
  ACTION_UNDO_MAP: () => void,
  ACTION_REDO_MAP: () => void,
  ACTION_SELECT_NODE: (nodeId: number | null) => void,
  ACTION_CREATE_NODE: (node: NodeType) => void,
  ACTION_CREATE_NODE_WITH_EDGE: (node: NodeType, edge: EdgeType, sourceNodeId: number) => void,
  ACTION_UPDATE_NODE: (node: NodeType) => void,
  ACTION_DELETE_NODE: (nodeId: number) => void,
  ACTION_SELECT_EDGE: (edgeId: number | null) => void,
  ACTION_DELETE_EDGE: (edgeId: string | number, nodeId: string | number) => void,
  ACTION_CREATE_EDGE: (edge: EdgeType) => void,
  ACTION_UPDATE_NODE_COLLAPSE: (nodeId: number) => void,
  ACTION_UPDATE_NODE_RESIZE: (nodeId: number, width: number, height: number) => void,
  ACTION_UPDATE_NODE_LOCK: (nodeId: number) => void,
  defaults: DefaultsType,
};

export type IGraphState = {
  layoutEngineType: LayoutEngineType;
  copiedNode: NodeType;
};
