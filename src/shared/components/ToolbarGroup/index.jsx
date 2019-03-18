// @flow
import React from 'react';

import type { ToolbarGroup as ToolbarGroupType } from '../../../types';
import ToolbarItem from '../ToolbarItem';

import './toolbarGroup.scss';

const ToolbarGroup = ({ group }: { group: ToolbarGroupType }) => (
  <div key={group.id} className="toolbar-group">
    {group.itemList.map(item => <ToolbarItem key={item.id} item={item} />)}
  </div>
);

export default ToolbarGroup;
