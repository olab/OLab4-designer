// @flow
import type {
  Edge as EdgeData,
  Node as NodeData,
  Map as MapType,
} from '../reducers/map/types';

export type IConstructorProps = {
  map: MapType,
  isShowSOPicker: boolean,
  match: any,
  history: any,
  ACTION_GET_MAP_REQUESTED: Function,
  ACTION_CREATE_TEMPLATE_FROM_MAP: Function,
};
export type IConstructorState = {
  isFullScreen: boolean,
  selectedLink: EdgeData | null,
  selectedNode: NodeData | null,
  isShowCreateTemplateModal: boolean,
};

export type Constructor = {
  cursor: string,
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
};

export const SET_ZOOM_CONTROLS_REF = 'SET_ZOOM_CONTROLS_REF';
type SetZoomControlsRef = {
  type: 'SET_ZOOM_CONTROLS_REF',
  ref: { current: null | HTMLDivElement },
};

export const SET_CURSOR = 'SET_CURSOR';
type SetCursor = {
  type: 'SET_CURSOR',
  cursor: string,
};

export type ConstructorActions = SetZoomControlsRef | SetCursor;

export default {
  SET_ZOOM_CONTROLS_REF,
  SET_CURSOR,
};
