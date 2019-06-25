// @flow
import type { Edge as EdgeType } from '../../reducers/map/types';
import type { EdgeData as EdgeDataType } from '../../Constructor/Graph/Edge/types';
import type { ModalPosition as ModalPositionType } from '../types';

export type ILinkEditorProps = {
  classes: {
    [props: string]: any,
  },
  ...ModalPositionType,
  link: EdgeDataType,
  edges: Array<EdgeType>,
  isDragging: boolean;
  connectDragSource: Function;
  connectDragPreview: Function;
  ACTION_UPDATE_EDGE: Function;
  ACTION_UPDATE_EDGE_VISUAL: Function;
  ACTION_DESELECT_ITEM: Function;
  ACTION_SET_POSITION_MODAL: Function;
  layoutEngineType: string,
};

export type ILinkEditorState = {
  ...EdgeDataType,
  shouldUpdateVisual: boolean,
};
