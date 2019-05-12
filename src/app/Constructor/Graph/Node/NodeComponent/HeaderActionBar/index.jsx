// @flow
import React from 'react';

import { Fab } from '@material-ui/core';

import {
  LockIcon, MinimizeIcon,
} from '../icons';

import { COLLAPSE_NODE, LOCK_NODE } from '../../config';

import type { IHeaderActionBarProps } from './types';

const HeaderActionBar = ({ classes }: IHeaderActionBarProps) => <>
  <Fab data-active="true" data-action={COLLAPSE_NODE} className={classes.actionBarButton}>
    <MinimizeIcon />
  </Fab>
  <Fab data-active="true" data-action={LOCK_NODE} className={classes.actionBarButton}>
    <LockIcon />
  </Fab>
  </>;

export default HeaderActionBar;
