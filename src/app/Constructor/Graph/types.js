// @flow
import type { NodeData as NodeDataType } from './Node/types';
import type { LayoutEngine as LayoutEngineType } from './utilities/layout-engine/layout-engine-config';
import type { Defaults as DefaultsType } from '../../reducers/defaults/types';
import type {
  Node as NodeType,
  Edge as EdgeType,
  Map as MapType,
} from '../../reducers/map/types';

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
  ACTION_RESET_MAP: () => void,
  ACTION_SELECT_ITEM: (id: number | null) => void,
  ACTION_CREATE_NODE: (nodeData: NodeType) => void,
  ACTION_CREATE_NODE_WITH_EDGE: (nodeData: NodeType, edgeData: EdgeType) => void,
  ACTION_UPDATE_NODE: (nodeData: NodeDataType) => void,
  ACTION_DELETE_NODE: (nodeId: number) => void,
  ACTION_DELETE_EDGE: (edgeId: string | number) => void,
  ACTION_CREATE_EDGE: (edgeData: EdgeType) => void,
  ACTION_UPDATE_NODE_COLLAPSE: (nodeId: number) => void,
  ACTION_UPDATE_NODE_RESIZE: (nodeId: number, width: number, height: number) => void,
  ACTION_UPDATE_NODE_LOCK: (nodeId: number) => void,
  defaults: DefaultsType,
};

export type IGraphState = {
  layoutEngineType: LayoutEngineType;
  copiedNode: NodeType;
};
