// @flow
import type { ToolbarItem as ToolbarItemType } from '../../../app/Constructor/Toolbars/types';

export type IToolbarItemProps = {
  ...ToolbarItemType,
  classes: {
    [props: string]: any,
  },
};
