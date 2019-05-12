// @flow
import React from 'react';

import {
  DragableIcon, StarIcon, NodeLockedIcon,
} from '../icons';

import type { IHeaderTitleProps } from './types';

const HeaderTitle = ({ classes, isMainNode, isLocked }: IHeaderTitleProps) => (
  <div className={classes.titleContainer}>
    <DragableIcon />
    {isMainNode === 1 && <StarIcon />}
    {isLocked && <NodeLockedIcon />}
    <p className={classes.title}>Node name</p>
  </div>
);

export default HeaderTitle;
