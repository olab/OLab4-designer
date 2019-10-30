import { ACTION_GET_MAP_REQUESTED } from '../../app/reducers/map/action';
import { ACTION_GET_MAP_DETAILS_REQUESTED } from '../../app/reducers/mapDetails/action';

import { GET_WHOLE_MAP_MIDDLEWARE } from './types';

const getWholeMap = store => next => (action) => {
  if (GET_WHOLE_MAP_MIDDLEWARE === action.type) {
    store.dispatch(ACTION_GET_MAP_DETAILS_REQUESTED(action.mapId));
    store.dispatch(ACTION_GET_MAP_REQUESTED(action.mapId));
  }

  next(action);
};

export default getWholeMap;
