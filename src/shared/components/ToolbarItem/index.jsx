// @flow
import React from 'react';

import type { ToolbarItem as ToolbarItemType } from '../../../app/Constructor/Toolbars/types';

import { Item, Icon } from './styles';

const ToolbarItem = (item: ToolbarItemType) => (
  <Item
    key={item.id}
    className="toolbar-item"
    onClick={item.onClick}
    aria-hidden="true"
  >
    <Icon alt={item.label} src={item.icon} />
  </Item>
);

export default ToolbarItem;
