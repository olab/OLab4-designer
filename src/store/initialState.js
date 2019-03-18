// @flow
import type {
  Store as StoreType,
  Constructor as ConstructorType,
} from '../types';

import sample from '../helpers/nodes_sample';

export const initialConstructorState: ConstructorType = {
  currentTool: 'arrow',
  zoom: {
    index: 50,
    zoomStep: 1,
    maxZoom: 150,
    minZoom: 15,
    zoomControlsRef: {
      current: null,
    },
  },
  autoSave: {
    enabled: true,
    interval: 30000,
  },
  graph: {
    undo: [],
    current: {
      nodes: sample.nodes,
      edges: sample.edges,
    },
    redo: [],
  },
};

const initialState: StoreType = {
  user: {
    isAuth: false,
    errorMessage: '',
    data: {
      id: null,
      name: '',
      username: '',
    },
    authData: {
      token: '',
    },
    isFetching: false,
  },
  constructor: initialConstructorState,
  maps: [],
  map: {
    id: null,
    name: '',
    abstract: '',
    keywords: '',
    enabled: false,
  },
  app: {
    loadingState: [],
  },
  scopedObjects: [],
};

export default initialState;
