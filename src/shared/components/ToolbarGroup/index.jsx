// @flow
import React from 'react';

import ToolbarItem from '../ToolbarItem';
import type { ToolbarGroup as ToolbarGroupType } from '../../../app/Constructor/Toolbars/types';

import './index.scss';

const ToolbarGroup = ({ group }: { group: ToolbarGroupType }) => (
  <div
    key={group.id}
    className="toolbar-group"
  >
    {group.itemList.map(item => <ToolbarItem key={item.id} {...item} />)}
  </div>
);

export default ToolbarGroup;
