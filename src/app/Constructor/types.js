// @flow
import type { Map as MapType } from '../reducers/map/types';
import type { Node as NodeType } from './Graph/Node/types';
import type { Edge as EdgeType } from './Graph/Edge/types';
import type { Template as TemplateType } from '../reducers/templates/types';

export type IConstructorProps = {
  map: MapType,
  isShowSOPicker: boolean,
  match: any,
  history: any,
  ACTION_GET_MAP_REQUESTED: Function,
  ACTION_TEMPLATE_UPLOAD_REQUESTED: Function,
  ACTION_TEMPLATES_REQUESTED: Function,
  ACTION_EXTEND_MAP_REQUESTED: Function,
  templates: Array<TemplateType>,
  isTemplatesFetching: boolean,
};
export type IConstructorState = {
  isFullScreen: boolean,
  selectedLink: EdgeType | null,
  selectedNode: NodeType | null,
  isShowCreateTemplateModal: boolean,
  isShowPreBuiltTemplatesModal: boolean,
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

const SET_ZOOM_CONTROLS_REF = 'SET_ZOOM_CONTROLS_REF';
type SetZoomControlsRef = {
  type: 'SET_ZOOM_CONTROLS_REF',
  ref: { current: null | HTMLDivElement },
};

const SET_CURSOR = 'SET_CURSOR';
type SetCursor = {
  type: 'SET_CURSOR',
  cursor: string,
};

export type ConstructorActions = SetZoomControlsRef | SetCursor;

export {
  SET_ZOOM_CONTROLS_REF,
  SET_CURSOR,
};
