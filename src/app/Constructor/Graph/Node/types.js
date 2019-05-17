// @flow
export type IPoint = {
  x: number;
  y: number;
};

export type INode = {
  title?: string;
  x?: number | null;
  y?: number | null;
  type?: string;
  [key: string]: any;
};

export type INodeProps = {
  data: INode;
  id: string;
  isSelected: boolean;
  onNodeMouseEnter: (event: any, data: any, hovered: boolean) => void;
  onNodeMouseLeave: (event: any, data: any) => void;
  onNodeMove: (point: IPoint, id: string, shiftKey: boolean) => void;
  onNodeSelected: (data: any, id: string, shiftKey: boolean) => void;
  onNodeUpdate: (point: IPoint, id: string, shiftKey: boolean) => void;
  onCreateNodeWithEdge: (x: number, y: number, sourceNode: INode) => void;
  onNodeCollapsed: (id: number, width: number, height: number) => void;
  onNodeResize: (id: number, width: number, height: number) => void;
  onNodeLocked: (id: number) => void;
  ACTION_SAVE_MAP_TO_UNDO: () => void;
  layoutEngine?: any;
  viewWrapperElem: HTMLDivElement;
};

export type INodeState = {
  // hovered: boolean;
  x: number;
  y: number;
  isResizeStart: boolean,
  // selected: boolean;
  drawingEdge: boolean;
};
