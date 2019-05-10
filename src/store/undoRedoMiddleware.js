import {
  SWAP_EDGE,
  DELETE_EDGE,
  DELETE_NODE,
  CREATE_EDGE,
  CREATE_NODE,
  CREATE_NODE_WITH_EDGE,
  SAVE_GRAPH_TO_UNDO,
  COLLAPSE_NODE,
  LOCK_NODE,
} from '../app/Constructor/types';

const undoRedoMiddleware = store => next => (action) => {
  if ([
    SWAP_EDGE,
    DELETE_EDGE,
    COLLAPSE_NODE,
    LOCK_NODE,
    DELETE_NODE,
    CREATE_EDGE,
    CREATE_NODE,
    CREATE_NODE_WITH_EDGE,
  ].includes(action.type)) {
    store.dispatch({ type: SAVE_GRAPH_TO_UNDO });
  }

  next(action);
};

export default undoRedoMiddleware;
