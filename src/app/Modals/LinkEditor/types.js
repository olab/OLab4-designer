// @flow
import type { Edge as EdgeType } from '../../Constructor/Graph/Edge/types';
import type { ModalPosition as ModalPositionType } from '../types';

export type ILinkEditorProps = {
  classes: {
    [props: string]: any,
  },
  ...ModalPositionType,
  link: EdgeType,
  edges: Array<EdgeType>,
  isDragging: boolean;
  connectDragSource: Function;
  connectDragPreview: Function;
  ACTION_UPDATE_EDGE: Function;
  ACTION_DESELECT_EDGE: Function;
  ACTION_SET_POSITION_MODAL: Function;
  layoutEngineType: string,
};

export type ILinkEditorState = {
  ...EdgeType,
  shouldUpdateVisual: boolean,
};
