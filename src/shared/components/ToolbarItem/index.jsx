// @flow
import React from 'react';

import type { ToolbarItem as ToolbarItemType } from '../../../types';

import './toolbarItem.scss';

const ToolbarItem = ({ item }: { item: ToolbarItemType }) => (
  <div key={item.id} className="toolbar-item" onClick={item.onClick} aria-hidden="true">
    <img alt={item.label} src={item.icon} />
  </div>
);

export default ToolbarItem;
