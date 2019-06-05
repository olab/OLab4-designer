import {
  CREATE_NODE,
  DELETE_NODE,
  CREATE_EDGE,
  RESIZE_NODE,
  CREATE_NODE_WITH_EDGE,
  UPDATE_EDGE,
  DELETE_EDGE,
  SAVE_MAP_TO_UNDO,
  COLLAPSE_NODE,
  LOCK_NODE,
} from '../app/reducers/map/types';

const undoRedoMiddleware = store => next => (action) => {
  if ([
    DELETE_EDGE,
    COLLAPSE_NODE,
    LOCK_NODE,
    RESIZE_NODE,
    DELETE_NODE,
    CREATE_EDGE,
    CREATE_NODE_WITH_EDGE,
    CREATE_NODE,
    UPDATE_EDGE,
  ].includes(action.type)) {
    store.dispatch({ type: SAVE_MAP_TO_UNDO });
  }

  next(action);
};

export default undoRedoMiddleware;
