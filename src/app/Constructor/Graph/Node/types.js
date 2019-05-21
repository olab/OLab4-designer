// @flow
export type IPoint = {
  x: number;
  y: number;
};

export type NodeData = {
  id: number,
  map_id: number,
  title: string,
  type_id: number,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  type: number,
  text: string,
  links: Array<{}>,
  destination_id: number,
  style_id: number,
  type_id: number,
  isCollapsed: boolean,
  isLocked: boolean,
};

export type INodeProps = {
  data: NodeData;
  id: string;
  isSelected: boolean;
  onNodeMouseEnter: (event: any, data: any, hovered: boolean) => void;
  onNodeMouseLeave: (event: any, data: any) => void;
  onNodeMove: (point: IPoint, id: string, shiftKey: boolean) => void;
  onNodeSelected: (data: any, id: string, shiftKey: boolean) => void;
  onNodeUpdate: (point: IPoint, id: string, shiftKey: boolean) => void;
  onCreateNodeWithEdge: (x: number, y: number, sourceNode: NodeData) => void;
  onNodeCollapsed: (id: number) => void;
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
