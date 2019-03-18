// @flow
import cloneDeep from 'lodash.clonedeep';
import {
  type GraphActions,
  SAVE_GRAPH_TO_UNDO,
  UNDO_GRAPH,
  REDO_GRAPH,
  SELECT_ITEM,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  CREATE_EDGE,
  DELETE_EDGE,
  SWAP_EDGE,
  SET_ZOOM_CONTROLS_REF,
} from './types';
import type { Constructor as ConstructorType } from '../../../../types';
import { initialConstructorState } from '../../../../store/initialState';

export default (state: ConstructorType = initialConstructorState, action: GraphActions) => {
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
      const zoom = cloneDeep(state.zoom);
      const { ref } = action;

      zoom.zoomControlsRef = ref;

      return {
        ...state,
        zoom,
      };
    }
    default:
      return state;
  }
};
