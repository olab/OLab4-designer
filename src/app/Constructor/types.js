// @flow
import type {
  Edge as EdgeData,
  Node as NodeData,
  Map as MapType,
} from '../reducers/map/types';

export type IConstructorProps = {
  map: MapType,
  ACTION_CREATE_TEMPLATE_FROM_MAP: Function,
};
export type IConstructorState = {
  isFullScreen: boolean,
  selectedLink: EdgeData | null,
  selectedNode: NodeData | null,
  isShowCreateTemplateModal: boolean,
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
};

export const SET_ZOOM_CONTROLS_REF = 'SET_ZOOM_CONTROLS_REF';
type SetZoomControlsRef = {
  type: 'SET_ZOOM_CONTROLS_REF',
  ref: { current: null | HTMLDivElement },
};

export type ConstructorActions = SetZoomControlsRef;

export default {
  SET_ZOOM_CONTROLS_REF,
};
