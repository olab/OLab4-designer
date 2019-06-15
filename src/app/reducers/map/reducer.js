// @flow
import {
  type MapActions,
  type Map as MapType,
  SELECT_ITEM,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  CREATE_EDGE,
  DELETE_EDGE,
  EXCHANGE_NODE_ID,
  EXCHANGE_EDGE_ID,
  CREATE_NODE_WITH_EDGE,
  UPDATE_EDGE,
  UPDATE_EDGE_VISUAL,
  RENAME_MAP,
  EXTEND_MAP_REQUESTED,
  EXTEND_MAP_FAILED,
  EXTEND_MAP_SUCCEEDED,
  UNDO_MAP,
  REDO_MAP,
  SAVE_MAP_TO_UNDO,
  GET_MAP_FAILED,
  GET_MAP_SUCCEEDED,
  GET_MAP_REQUESTED,
  CREATE_MAP_FAILED,
  CREATE_MAP_SUCCEEDED,
  CREATE_MAP_REQUESTED,
} from './types';

export const initialMapState: MapType = {
  id: null,
  name: 'My Labyrinth',
  abstract: '',
  keywords: '',
  enabled: false,
  isFetching: false,
  nodes: [],
  edges: [],
  undo: [],
  redo: [],
};

const map = (state: MapType = initialMapState, action: MapActions) => {
  switch (action.type) {
    case SAVE_MAP_TO_UNDO: {
      const { undo, ...restState } = state;
      const { currentMap } = action;

      return {
        ...restState,
        undo: [
          ...undo,
          currentMap,
        ],
        redo: [],
      };
    }
    case UNDO_MAP: {
      const { currentMap, prev } = action;
      const { undo, redo, ...restState } = state;

      return {
        ...restState,
        nodes: prev.nodes,
        edges: prev.edges,
        undo: [
          ...undo.slice(0, undo.length - 1),
        ],
        redo: [
          ...redo,
          currentMap,
        ],
      };
    }
    case REDO_MAP: {
      const { currentMap, next } = action;
      const { undo, redo, ...restState } = state;

      return {
        ...restState,
        nodes: next.nodes,
        edges: next.edges,
        redo: [
          ...redo.slice(0, redo.length - 1),
        ],
        undo: [
          ...undo,
          currentMap,
        ],
      };
    }
    case RENAME_MAP: {
      const { name } = action;

      return {
        ...state,
        name,
      };
    }
    case EXTEND_MAP_SUCCEEDED: {
      const { nodes, edges } = action;

      return {
        ...state,
        nodes,
        edges,
        isFetching: false,
      };
    }
    case EXTEND_MAP_REQUESTED:
      return {
        ...state,
        isFetching: true,
      };
    case EXTEND_MAP_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case SELECT_ITEM: {
      const { nodes, edges } = action;

      return {
        ...state,
        nodes,
        edges,
      };
    }
    case CREATE_NODE: {
      const { nodes } = action;

      return {
        ...state,
        nodes,
      };
    }
    case EXCHANGE_NODE_ID: {
      const { nodes, edges } = action;

      return {
        ...state,
        nodes,
        edges,
      };
    }
    case EXCHANGE_EDGE_ID: {
      const { edges } = action;

      return {
        ...state,
        edges,
      };
    }
    case CREATE_NODE_WITH_EDGE: {
      const { nodes, edges } = action;

      return {
        ...state,
        nodes,
        edges,
      };
    }
    case CREATE_EDGE: {
      const { nodes, edges } = action;

      return {
        ...state,
        nodes,
        edges,
      };
    }
    case UPDATE_EDGE_VISUAL:
    case UPDATE_EDGE: {
      const { edges } = action;

      return {
        ...state,
        edges: [...edges],
      };
    }
    case UPDATE_NODE: {
      const { nodes } = action;

      return {
        ...state,
        nodes,
      };
    }
    case DELETE_NODE: {
      const { nodes, edges } = action;

      return {
        ...state,
        nodes,
        edges,
      };
    }
    case DELETE_EDGE: {
      const { edges } = action;

      return {
        ...state,
        edges,
      };
    }
    case CREATE_MAP_SUCCEEDED: {
      const { map: newMap } = action;

      return {
        ...newMap,
        isFetching: false,
      };
    }
    case CREATE_MAP_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case CREATE_MAP_REQUESTED:
      return {
        ...state,
        isFetching: true,
      };
    case GET_MAP_SUCCEEDED: {
      const { map: newMap } = action;

      return {
        ...newMap,
        isFetching: false,
      };
    }
    case GET_MAP_REQUESTED:
      return {
        ...state,
        isFetching: true,
      };
    case GET_MAP_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default map;
