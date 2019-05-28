// @flow
export type IHomeProps = {
  classes: {
    [props: string]: any,
  },
  history: any,
  mapId: number | null,
  isMapFetching: boolean,
  ACTION_CREATE_MAP_REQUESTED: Function,
};

export type IHomeState = {
  expanded: string | null,
  isButtonsDisabled: boolean,
};
