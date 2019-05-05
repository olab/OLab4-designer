// @flow

export type Props = {
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

export type State = {
  isMainNode: boolean,
}
