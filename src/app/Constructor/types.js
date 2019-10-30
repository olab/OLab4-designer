// @flow
import type { Node as NodeType } from './Graph/Node/types';
import type { Edge as EdgeType } from './Graph/Edge/types';
import type { Template as TemplateType } from '../reducers/templates/types';

export type IConstructorProps = {
  match: any,
  history: any,
  location: any,
  mapId: string,
  mapName: string,
  mapIdUrl: number,
  isShowSOPicker: boolean,
  isTemplatesFetching: boolean,
  nodes: Array<NodeType>,
  edges: Array<EdgeType>,
  templates: Array<TemplateType>,
  ACTION_GET_MAP_REQUESTED: Function,
  ACTION_TEMPLATES_REQUESTED: Function,
  ACTION_EXTEND_MAP_REQUESTED: Function,
  ACTION_TEMPLATE_UPLOAD_REQUESTED: Function,
  ACTION_GET_WHOLE_MAP_MIDDLEWARE: Function,
};
export type IConstructorState = {
  selectedLink: EdgeType | null,
  focusedNode: NodeType | null,
  isShowCreateTemplateModal: boolean,
  isShowPreBuiltTemplatesModal: boolean,
};

export type Constructor = {
  cursor: string,
  layoutEngine: 'None' | 'SnapToGrid' | 'VerticalTree',
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

const SET_LAYOUT_ENGINE = 'SET_LAYOUT_ENGINE';
type SetLayoutEngine = {
  type: 'SET_LAYOUT_ENGINE',
  layoutEngine: string,
};

const TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN';
type ToggleFullscreen = {
  type: 'TOGGLE_FULLSCREEN',
};

export type ConstructorActions = SetFullscreen |
  ToggleFullscreen | SetCursor |
  SetLayoutEngine;

export {
  SET_CURSOR,
  SET_FULLSCREEN,
  SET_LAYOUT_ENGINE,
  TOGGLE_FULLSCREEN,
};
