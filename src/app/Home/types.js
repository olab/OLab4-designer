// @flow
export type IHomeProps = {
  classes: {
    [props: string]: any;
  };
  ACTION_CREATE_MAP_FROM_TEMPLATE: Function;
  history: any;
};

export type IHomeState = {
  expanded: string | null;
};
