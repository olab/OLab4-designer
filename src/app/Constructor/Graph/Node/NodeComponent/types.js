// @flow

export type INodeProps = {
  classes: {
    [props: string]: any,
  },
  color: string,
  text: string,
  title: string,
  width: number,
  height: number,
  type: number,
  isCollapsed: boolean,
  isLocked: boolean,
  isLinked: boolean,
  resizeRef: any,
};
