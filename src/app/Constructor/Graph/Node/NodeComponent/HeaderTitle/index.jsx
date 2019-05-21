// @flow
import React from 'react';

import {
  DragableIcon, StarIcon, NodeLockedIcon,
} from '../icons';

import type { IHeaderTitleProps } from './types';

import { TitleContainer, TitleText } from './styles';

const HeaderTitle = ({
  type, isLocked, title,
}: IHeaderTitleProps) => (
  <TitleContainer>
    <DragableIcon />
    {type === 1 && <StarIcon />}
    {isLocked && <NodeLockedIcon />}
    <TitleText>{title}</TitleText>
  </TitleContainer>
);

export default HeaderTitle;
