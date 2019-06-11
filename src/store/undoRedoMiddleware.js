import {
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  CREATE_EDGE,
  CREATE_NODE_WITH_EDGE,
  UPDATE_EDGE,
  DELETE_EDGE,
  SAVE_MAP_TO_UNDO,
  COLLAPSE_NODE,
  LOCK_NODE,
  RESIZE_NODE,
} from '../app/reducers/map/types';

const undoRedoMiddleware = store => next => (action) => {
  if ([
    COLLAPSE_NODE,
    LOCK_NODE,
    RESIZE_NODE,
    CREATE_NODE,
    UPDATE_NODE,
    DELETE_NODE,
    CREATE_NODE_WITH_EDGE,
    CREATE_EDGE,
    UPDATE_EDGE,
    DELETE_EDGE,
  ].includes(action.type)) {
    store.dispatch({ type: SAVE_MAP_TO_UNDO });
  }

  next(action);
};

export default undoRedoMiddleware;
