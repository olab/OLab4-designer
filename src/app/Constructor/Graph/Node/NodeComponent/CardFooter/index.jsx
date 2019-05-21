// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';

import type { ICardFooterProps } from './types';

import { ACTION_ADD, ACTION_LINK } from '../../config';

import { LinkIcon, AddIcon } from '../icons';

import styles from './styles';


const CardFooter = ({ classes }: ICardFooterProps) => (
  <div className={classes.footer}>
    <Fab data-active="true" data-action={ACTION_ADD} className={classes.fab}>
      <AddIcon />
    </Fab>
    <Fab data-active="true" data-action={ACTION_LINK} className={classes.fab}>
      <LinkIcon />
    </Fab>
  </div>
);

export default withStyles(styles)(CardFooter);
