// @flow

export type UserData = {
  id: number | null,
  name: string,
  username: string,
};

export type AuthData = {
  token: string,
};

export type User = {
  isAuth: boolean,
  errorMessage: string,
  data: UserData,
  authData: AuthData,
  isFetching: boolean,
};

export type EdgeData = {
  id: number,
  handleText: string,
  source: number,
  target: number,
};

export type Edge = {
  isSelected: boolean,
  data: EdgeData,
};

export type NodeData = {
  id: number,
  map_id: number,
  title: string,
  type_id: number,
  x: number,
  y: number,
  color: string,
  text: string,
  links: Array<{}>,
  destination_id: number,
  style_id: number,
  type_id: number,
};

export type Node = {
  isSelected: boolean,
  expand: boolean,
  locked: boolean,
  data: NodeData,
};

export type ToolbarItem = {
  id: string,
  name: string,
  icon: string,
  mouseIcon: string,
  order: number,
  label: string,
  onClick?: Function,
};

export type ToolbarGroup = {
  id: string,
  order: number,
  itemList: Array<ToolbarItem>,
};

export type GraphItem = {
  nodes: Array<Node>,
  edges: Array<Edge>,
};

export type Constructor = {
  currentTool: string,
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
  graph: {
    undo: Array<GraphItem>,
    current: GraphItem,
    redo: Array<GraphItem>,
  },
};

export type Map = {
  id: number | null,
  name: string,
  abstract: string,
  keywords: string,
  enabled: boolean,
};

export type App = {
  loadingState: Array<{
    id: string,
    isLoading: boolean,
  }>,
};

export type ScopedObjects = Array<{
  id: number,
  name: string,
  type: string,
}>;

export type Store = {
  user: User,
  constructor: Constructor,
  maps: Array<Map>,
  map: Map,
  app: App,
  scopedObjects: ScopedObjects,
};
