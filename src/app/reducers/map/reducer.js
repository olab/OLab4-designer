// @flow
import cloneDeep from 'lodash.clonedeep';
import {
  type MapActions,
  type Map as MapType,
  SELECT_ITEM,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  CREATE_EDGE,
  DELETE_EDGE,
  RESET_MAP,
  EXCHANGE_NODE_ID,
  EXCHANGE_EDGE_ID,
  CREATE_NODE_WITH_EDGE,
  UPDATE_EDGE,
  UPDATE_EDGE_VISUAL,
  RENAME_MAP,
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
      const { undo, ...rest } = state;
      undo.push(cloneDeep({
        nodes: state.nodes,
        edges: state.edges,
      }));

      return {
        ...rest,
        undo,
        redo: [],
      };
    }
    case UNDO_MAP: {
      const { undo, redo, ...rest } = state;
      const prev = undo.pop();

      redo.push(cloneDeep({
        nodes: state.nodes,
        edges: state.edges,
      }));

      return {
        ...rest,
        nodes: prev.nodes,
        edges: prev.edges,
        undo,
        redo,
      };
    }
    case REDO_MAP: {
      const { undo, redo, ...rest } = state;
      const next = redo.pop();

      undo.push(cloneDeep({
        nodes: state.nodes,
        edges: state.edges,
      }));

      return {
        ...rest,
        nodes: next.nodes,
        edges: next.edges,
        undo,
        redo,
      };
    }
    case RESET_MAP: {
      const mapState = cloneDeep(initialMapState);
      mapState.nodes = [];
      mapState.edges = [];

      return {
        ...mapState,
      };
    }
    case RENAME_MAP: {
      const { name } = action;

      return {
        ...state,
        name,
      };
    }
    case SELECT_ITEM: {
      const graph = cloneDeep([state.nodes, state.edges]);
      const { id } = action;

      graph.forEach((items) => {
        items.forEach((item) => {
          if (id) {
            item.isSelected = item.data.id === id;
          } else {
            item.isSelected = false;
          }
        });
      });

      const [nodes, edges] = graph;

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
        edges,
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
