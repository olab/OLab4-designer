// @flow

export type INodeProps = {
  classes: {
    card: {},
    cardHeader: {},
    cardHeaderRegular: string,
    titleContainer: {},
    title: {},
    action: {},
    cardContent: {},
    cardContentLocked: string,
    pos: {},
    actionBarButton: {},
  },
  isCollapsed: boolean,
  isLocked: boolean,
  resizeRef: any,
};

export type INodeState = {
  isMainNode: boolean,
}
