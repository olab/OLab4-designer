import {
  SWAP_EDGE,
  DELETE_EDGE,
  DELETE_NODE,
  CREATE_EDGE,
  CREATE_NODE,
  SAVE_GRAPH_TO_UNDO,
} from '../app/Constructor/types';

const undoRedoMiddleware = store => next => (action) => {
  if ([SWAP_EDGE, DELETE_EDGE, DELETE_NODE, CREATE_EDGE, CREATE_NODE].includes(action.type)) {
    store.dispatch({ type: SAVE_GRAPH_TO_UNDO });
  }

  next(action);
};

export default undoRedoMiddleware;
