// @flow

export type INodeProps = {
  classes: {
    card: {},
    cardHeader: {},
    cardHeaderRegular: string,
    action: {},
    titleContainer: {},
    title: {},
    actionBarButton: {},
    cardContent: {},
    cardContentLocked: string,
    pos: {},
    cardContentText: {},
  },
  width: number,
  height: number,
  type: number,
  isCollapsed: boolean,
  isLocked: boolean,
  resizeRef: any,
};

export type INodeState = {
  isMainNode: boolean,
}
