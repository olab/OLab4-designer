// @flow
export const GET_WHOLE_MAP_REQUESTED = 'GET_WHOLE_MAP_REQUESTED';
type GetWholeMapRequested = {
  type: 'GET_WHOLE_MAP_REQUESTED',
  mapId: string,
};

export type WholeMapActions = GetWholeMapRequested;

export default {
  GET_WHOLE_MAP_REQUESTED,
};
