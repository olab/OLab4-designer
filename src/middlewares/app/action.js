// @flow
import { GET_WHOLE_MAP_REQUESTED } from './types';

export const ACTION_GET_WHOLE_MAP_REQUESTED = (mapId: number | string) => ({
  type: GET_WHOLE_MAP_REQUESTED,
  mapId,
});

export default {
  ACTION_GET_WHOLE_MAP_REQUESTED,
};
