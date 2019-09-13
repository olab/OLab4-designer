// @flow
import React from 'react';

import NodeLockedIcon from '../../../../../../shared/assets/icons/node_locked.svg';
import StarIcon from '../../../../../../shared/assets/icons/star.svg';
import DragableIcon from '../../../../../../shared/assets/icons/draggable.svg';

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
