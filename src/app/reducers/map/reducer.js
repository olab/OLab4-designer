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
  SWAP_EDGE,
  RESET_MAP,
  COLLAPSE_NODE,
  RESIZE_NODE,
  LOCK_NODE,
  CREATE_NODE_WITH_EDGE,
  UPDATE_EDGE,
  RENAME_MAP,
  UNDO_MAP,
  REDO_MAP,
  SAVE_MAP_TO_UNDO,
  CREATE_MAP_FROM_TEMPLATE,
} from './types';

import sample from '../../../helpers/nodes_sample';
import manualTemplate from '../../../helpers/templates/manual';
import simpleTemplate from '../../../helpers/templates/simple';

export const initialMapState: MapType = {
  id: null,
  name: 'My Labyrinth',
  abstract: '',
  keywords: '',
  enabled: false,
  nodes: sample.nodes,
  edges: sample.edges,
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
      const graph = cloneDeep([state.nodes, state.edges]);
      const { nodeData } = action;

      graph.forEach((items) => {
        items.forEach((item) => {
          item.isSelected = false;
        });
      });

      const [nodes, edges] = graph;
      nodes.push(nodeData);

      return {
        ...state,
        nodes,
        edges,
      };
    }
    case COLLAPSE_NODE: {
      const { nodes } = cloneDeep(state);
      const { id, width, height } = action;
      nodes
        .forEach((item) => {
          if (item.data.id === id) {
            item.data.isCollapsed = !item.data.isCollapsed;
            item.data.width = width;
            item.data.height = height;
          }
        });

      return {
        ...state,
        nodes,
      };
    }
    case RESIZE_NODE: {
      const { nodes } = cloneDeep(state);
      const { id, width, height } = action;
      nodes
        .forEach((item) => {
          if (item.data.id === id) {
            item.data.width = width;
            item.data.height = height;
          }
        });
      return {
        ...state,
        nodes,
      };
    }
    case LOCK_NODE: {
      const { nodes } = cloneDeep(state);
      const { id } = action;
      nodes
        .forEach((item) => {
          if (item.data.id === id) { item.data.isLocked = !item.data.isLocked; }
        });

      return {
        ...state,
        nodes,
      };
    }
    case CREATE_NODE_WITH_EDGE: {
      const { nodes, edges } = cloneDeep(state);
      const { nodeData, edgeData } = action;

      [nodes, edges]
        .forEach(items => items
          .forEach((item) => {
            item.isSelected = false;
          }));

      nodes.push(nodeData);
      edges.push(edgeData);

      return {
        ...state,
        nodes,
        edges,
      };
    }
    case CREATE_EDGE: {
      const graph = cloneDeep([state.nodes, state.edges]);
      const { edgeData } = action;

      graph.forEach((items) => {
        items.forEach((item) => {
          item.isSelected = false;
        });
      });

      const [nodes, edges] = graph;
      edges.push(edgeData);

      return {
        ...state,
        nodes,
        edges,
      };
    }
    case UPDATE_EDGE: {
      const { edges } = cloneDeep(state);
      const { edgeData } = action;

      const edge = edges.find(({ data }) => data.id === edgeData.id);
      Object.assign(edge.data, edgeData);

      return {
        ...state,
        edges,
      };
    }
    case UPDATE_NODE: {
      const nodes = cloneDeep(state.nodes);
      const { nodeData } = action;
      const i = state.nodes.findIndex(({ data }) => data.id === nodeData.id);

      nodes[i].data = nodeData;

      return {
        ...state,
        nodes,
      };
    }
    case DELETE_NODE: {
      const [nodes, edges] = cloneDeep([state.nodes, state.edges]);
      const { nodeId } = action;

      const newNodes = nodes.filter(({ data }) => data.id !== nodeId);
      const newEdges = edges.filter(({ data }) => data.source !== nodeId
        && data.target !== nodeId);

      return {
        ...state,
        nodes: newNodes,
        edges: newEdges,
      };
    }
    case DELETE_EDGE: {
      const { edgeId } = action;
      const edges = state.edges.filter(({ data }) => data.id !== edgeId);

      return {
        ...state,
        edges: [...edges],
      };
    }
    case SWAP_EDGE: {
      const graph = cloneDeep([state.nodes, state.edges]);
      const { edgeId, sourceNodeId, targetNodeId } = action;

      graph.forEach((items) => {
        items.forEach((item) => {
          item.isSelected = false;
        });
      });

      const [nodes, edges] = graph;
      const i = edges.findIndex(({ data }) => data.id === edgeId);

      edges[i].isSelected = true;
      edges[i].data.source = sourceNodeId;
      edges[i].data.target = targetNodeId;

      return {
        ...state,
        nodes,
        edges,
      };
    }
    case CREATE_MAP_FROM_TEMPLATE: {
      let template;
      const { templateName } = action;

      switch (templateName) {
        case 'manual':
          template = cloneDeep(manualTemplate);
          break;
        case 'simple':
          template = cloneDeep(simpleTemplate);
          break;
        default:
          return state;
      }

      const { nodes, edges } = template;

      return {
        ...cloneDeep(initialMapState),
        name: '',
        nodes,
        edges,
      };
    }
    default:
      return state;
  }
};

export default map;
