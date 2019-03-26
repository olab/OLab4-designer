// @flow
export type IPoint = {
  x: number;
  y: number;
};

export type INode = {
  title: string;
  x?: number | null;
  y?: number | null;
  type?: string;
  subtype?: string | null;
  [key: string]: any;
};

export type INodeProps = {
  data: INode;
  id: string;
  onNodeMouseEnter: (event: any, data: any, hovered: boolean) => void;
  onNodeMouseLeave: (event: any, data: any) => void;
  onNodeMove: (point: IPoint, id: string, shiftKey: boolean) => void;
  onNodeSelected: (data: any, id: string, shiftKey: boolean) => void;
  onNodeUpdate: (point: IPoint, id: string, shiftKey: boolean) => void;
  ACTION_SAVE_GRAPH_TO_UNDO: () => void;
  layoutEngine: any;
  viewWrapperElem: HTMLDivElement;
};

export type INodeState = {
  hovered: boolean;
  x: number;
  y: number;
  selected: boolean;
  drawingEdge: boolean;
};
