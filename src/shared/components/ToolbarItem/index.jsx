// @flow
import React from 'react';

import type { ToolbarItem as ToolbarItemType } from '../../../app/Constructor/Toolbars/types';

import './index.scss';

const ToolbarItem = ({ item }: { item: ToolbarItemType }) => (
  <div key={item.id} className="toolbar-item" onClick={item.onClick} aria-hidden="true">
    <img alt={item.label} src={item.icon} />
  </div>
);

export default ToolbarItem;
