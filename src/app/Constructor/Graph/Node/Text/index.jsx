// @flow
import React from 'react';

import type { INodeTextProps } from './types';

import { NodeTextWrapper } from './styles';

export const NodeText = ({ data: { title }, isSelected: selected }: INodeTextProps) => (
  <NodeTextWrapper
    selected={selected}
    textAnchor="middle"
  >
    <tspan x={0} dy={18} fontSize="10px">{title}</tspan>
    <title>{title}</title>
  </NodeTextWrapper>
);

export default NodeText;
