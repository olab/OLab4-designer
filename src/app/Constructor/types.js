// @flow
import type { Node as NodeType } from './Graph/Node/types';
import type { Edge as EdgeType } from './Graph/Edge/types';
import type { Template as TemplateType } from '../reducers/templates/types';

export type IConstructorProps = {
  mapId: string,
  nodes: Array<NodeType>,
  edges: Array<EdgeType>,
  isShowSOPicker: boolean,
  match: any,
  history: any,
  ACTION_GET_MAP_REQUESTED: Function,
  ACTION_TEMPLATE_UPLOAD_REQUESTED: Function,
  ACTION_TEMPLATES_REQUESTED: Function,
  ACTION_EXTEND_MAP_REQUESTED: Function,
  ACTION_SET_FULLSCREEN: Function,
  templates: Array<TemplateType>,
  isTemplatesFetching: boolean,
  isFullScreen: boolean,
};
export type IConstructorState = {
  selectedLink: EdgeType | null,
  focusedNode: NodeType | null,
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
  },
  autoSave: {
    isEnabled: boolean,
    interval: number,
  },
  isFullScreen: boolean,
};

const SET_CURSOR = 'SET_CURSOR';
type SetCursor = {
  type: 'SET_CURSOR',
  cursor: string,
};

const SET_FULLSCREEN = 'SET_FULLSCREEN';
type SetFullscreen = {
  type: 'SET_FULLSCREEN',
  isFullScreen: boolean,
};

const TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN';
type ToggleFullscreen = {
  type: 'TOGGLE_FULLSCREEN',
};

export type ConstructorActions = SetFullscreen |
  ToggleFullscreen | SetCursor;

export {
  SET_CURSOR,
  SET_FULLSCREEN,
  TOGGLE_FULLSCREEN,
};
