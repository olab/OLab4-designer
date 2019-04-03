// @flow
import React from 'react';

import type { ToolbarItem as ToolbarItemType } from '../../../app/Constructor/Toolbars/types';

import './index.scss';

const ToolbarItem = ({
  id,
  icon,
  label,
  onClick = null,
}: ToolbarItemType) => (
  <div
    key={id}
    className="toolbar-item"
    onClick={onClick}
    aria-hidden="true"
  >
    <img alt={label} src={icon} />
  </div>
);

export default ToolbarItem;
