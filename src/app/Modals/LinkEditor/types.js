// @flow
import type { EdgeData as EdgeDataType } from '../../Constructor/types';

export type ILinkEditorProps = {
  ACTION_UPDATE_EDGE: Function;
  ACTION_DESELECT_ITEM: Function;
  ACTION_SET_POSITION_LINK_EDITOR_MODAL: Function;
  connectDragSource: Function;
  connectDragPreview: Function;
  isDragging: boolean;
  link: EdgeDataType,
  x: number;
  y: number;
  classes: {
    [props: string]: any;
  };
};

export type ILinkEditorState = {
  ...EdgeDataType,
  isShowColorPicker: boolean;
};

export type IColorType = {
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
    a: number;
  },
  hsl: {
    h: number;
    s: number;
    l: number;
    a: number;
  },
};
