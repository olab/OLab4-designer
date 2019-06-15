// @flow
export type IPoint = {
  x: number;
  y: number;
};

export type Node = {
  id: number,
  mapId: number,
  title: string,
  type: number,
  ...IPoint,
  width: number,
  height: number,
  color: string,
  text: string,
  isCollapsed: boolean,
  isLocked: boolean,
  linkStyle: number,
  linkType: number,
};

export type INodeProps = {
  data: Node;
  id: string;
  isSelected: boolean;
  isLinkingStarted: boolean;
  isLinkSource: boolean;
  onNodeMove: (point: IPoint, id: number) => void;
  onNodeSelected: (data: any) => void;
  onNodeUpdate: (point: IPoint, nodeId: number) => void;
  onCreateNodeWithEdge: (x: number, y: number, sourceNode: Node) => void;
  onNodeCollapsed: (id: number) => void;
  onNodeResize: (id: number, width: number, height: number) => void;
  onNodeLocked: (id: number) => void;
  onNodeLink: (data: any) => void;
  ACTION_SAVE_MAP_TO_UNDO: () => void;
  layoutEngine?: any;
  viewWrapperElem: HTMLDivElement;
};

export type INodeState = {
  ...IPoint,
  isResizeStart: boolean,
};
