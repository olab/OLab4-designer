import {
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  CREATE_EDGE,
  CREATE_NODE_WITH_EDGE,
  UPDATE_EDGE,
  DELETE_EDGE,
} from '../app/reducers/map/types';

import { ACTION_SAVE_MAP_TO_UNDO } from '../app/reducers/map/action';

const undoRedoMiddleware = store => next => (action) => {
  if ([
    CREATE_NODE,
    UPDATE_NODE,
    DELETE_NODE,
    CREATE_NODE_WITH_EDGE,
    CREATE_EDGE,
    UPDATE_EDGE,
    DELETE_EDGE,
  ].includes(action.type)) {
    store.dispatch(ACTION_SAVE_MAP_TO_UNDO());
  }

  next(action);
};

export default undoRedoMiddleware;
