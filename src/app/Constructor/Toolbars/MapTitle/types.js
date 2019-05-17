// @flow
export type IMapTitleProps = {
  classes: {
    [props: string]: any,
  },
  title: string,
  ACTION_RENAME_MAP: Function,
};

export type IMapTitleState = {
  title: string,
  isError: boolean,
  isFocused: boolean,
};
