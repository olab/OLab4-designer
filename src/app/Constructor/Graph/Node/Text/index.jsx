// @flow
import React from 'react';
import classNames from 'classnames';

import type { INodeTextProps } from './types';

const NodeText = ({ data: { title }, isSelected: selected }: INodeTextProps) => (
  <text
    className={classNames('node-text', { selected })}
    textAnchor="middle"
  >
    <tspan x={0} dy={18} fontSize="10px">{title}</tspan>
    <title>{title}</title>
  </text>
);

export default NodeText;
