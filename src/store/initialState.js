// @flow

export type UserData = {
  id: string,
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

export type Constructor = {
  currentTool: string,
  zoom: {
    index: number,
    zoomStep: number,
    maxZoom: number,
    minZoom: number,
  },
  selectedNodes: Array<Node>,
  autoSave: {
    enabled: boolean,
    interval: number,
  },
};

export type Map = {
  id: number,
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
  nodes: Array<Node>,
  node: Node,
  app: App,
  scopedObjects: ScopedObjects,
};

const initialState: Store = {
  user: {
    isAuth: false,
    errorMessage: '',
    data: {},
    authData: {
      token: '',
    },
    isFetching: false,
  },
  constructor: {
    currentTool: 'arrow',
    zoom: {
      index: 50,
      zoomStep: 1,
      maxZoom: 100,
      minZoom: 1,
    },
    selectedNodes: [],
    autoSave: {
      enabled: true,
      interval: 30000,
    },
  },
  maps: [],
  map: {},
  nodes: [],
  node: {},
  app: {
    loadingState: [],
  },
  scopedObjects: [],
};

export default initialState;
