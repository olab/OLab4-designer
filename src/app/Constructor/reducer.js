// @flow
import cloneDeep from 'lodash.clonedeep';
import {
  type GraphActions,
  type Constructor as ConstructorType,
  SAVE_GRAPH_TO_UNDO,
  UNDO_GRAPH,
  REDO_GRAPH,
  SELECT_ITEM,
  COLLAPSE_NODE,
  LOCK_NODE,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  CREATE_EDGE,
  DELETE_EDGE,
  SWAP_EDGE,
  SET_ZOOM_CONTROLS_REF,
} from './types';

import sample from '../../helpers/nodes_sample';

export const initialConstructorState: ConstructorType = {
  currentTool: 'arrow',
  layoutEngineType: 'VerticalTree',
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

const constructor = (state: ConstructorType = initialConstructorState, action: GraphActions) => {
  switch (action.type) {
    case SAVE_GRAPH_TO_UNDO: {
      const { graph, ...rest } = state;
      graph.undo.push(cloneDeep(graph.current));
      graph.redo = [];

      return {
        ...rest,
        graph,
      };
    }
    case UNDO_GRAPH: {
      const { graph, ...rest } = state;
      const prev = graph.undo.pop();

      graph.redo.push(cloneDeep(graph.current));
      graph.current = prev;

      return {
        ...rest,
        graph,
      };
    }
    case REDO_GRAPH: {
      const { graph, ...rest } = state;
      const next = graph.redo.pop();

      graph.undo.push(cloneDeep(graph.current));
      graph.current = next;

      return {
        ...rest,
        graph,
      };
    }
    case SELECT_ITEM: {
      const graph = cloneDeep(state.graph);
      const { id } = action;

      [graph.current.nodes, graph.current.edges]
        .forEach(items => items
          .forEach((item) => {
            if (id) {
              item.isSelected = item.data.id === id;
            } else {
              item.isSelected = false;
            }
          }));

      return {
        ...state,
        graph,
      };
    }

    case COLLAPSE_NODE: {
      const graph = cloneDeep(state.graph);
      const { id } = action;
      [graph.current.nodes]
        .forEach(items => items
          .forEach((item) => {
            if (item.data.id === id) { item.data.isCollapsed = !item.data.isCollapsed; }
          }));

      return {
        ...state,
        graph,
      };
    }

    case LOCK_NODE: {
      const graph = cloneDeep(state.graph);
      const { id } = action;
      [graph.current.nodes]
        .forEach(items => items
          .forEach((item) => {
            if (item.data.id === id) { item.data.isLocked = !item.data.isLocked; }
          }));

      return {
        ...state,
        graph,
      };
    }

    case CREATE_NODE: {
      const graph = cloneDeep(state.graph);
      const { nodeData } = action;

      [graph.current.nodes, graph.current.edges]
        .forEach(items => items
          .forEach((item) => {
            item.isSelected = false;
          }));

      graph.current.nodes.push(nodeData);

      return {
        ...state,
        graph,
      };
    }
    case CREATE_EDGE: {
      const graph = cloneDeep(state.graph);
      const { edgeData } = action;

      [graph.current.nodes, graph.current.edges]
        .forEach(items => items
          .forEach((item) => {
            item.isSelected = false;
          }));

      graph.current.edges.push(edgeData);

      return {
        ...state,
        graph,
      };
    }
    case UPDATE_NODE: {
      const graph = cloneDeep(state.graph);
      const { nodeData } = action;
      const i = graph.current.nodes.findIndex(({ data }) => data.id === nodeData.id);

      graph.current.nodes[i].data = nodeData;

      return {
        ...state,
        graph,
      };
    }
    case DELETE_NODE: {
      const graph = cloneDeep(state.graph);
      const { nodeId } = action;

      const nodes = graph.current.nodes.filter(({ data }) => data.id !== nodeId);
      const edges = graph.current.edges.filter(({ data }) => data.source !== nodeId
        && data.target !== nodeId);

      graph.current = {
        nodes,
        edges,
      };

      return {
        ...state,
        graph,
      };
    }
    case DELETE_EDGE: {
      const graph = cloneDeep(state.graph);
      const { edgeId } = action;

      graph.current.edges = graph.current.edges.filter(({ data }) => data.id !== edgeId);

      return {
        ...state,
        graph,
      };
    }
    case SWAP_EDGE: {
      const graph = cloneDeep(state.graph);
      const { edgeId, sourceNodeId, targetNodeId } = action;

      [graph.current.nodes, graph.current.edges]
        .forEach(items => items
          .forEach((item) => {
            item.isSelected = false;
          }));

      const i = graph.current.edges.findIndex(({ data }) => data.id === edgeId);
      const edge = graph.current.edges[i];

      edge.isSelected = true;
      edge.data.source = sourceNodeId;
      edge.data.target = targetNodeId;

      return {
        ...state,
        graph,
      };
    }
    case SET_ZOOM_CONTROLS_REF: {
      const { ref } = action;

      return {
        ...state,
        zoom: {
          ...state.zoom,
          zoomControlsRef: {
            current: ref.current,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default constructor;
