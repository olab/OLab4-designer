// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';

import type { Props } from './types';

import { ADD_NODE, LINK_NODE } from '../../config';

import { LinkIcon, AddIcon } from '../icons';

import styles from './styles';


const CardFooter = ({ classes }: Props) => (
  <div className={classes.footer}>
    <Fab data-active="true" data-action={ADD_NODE} className={classes.fab}>
      <AddIcon />
    </Fab>
    <Fab data-active="true" data-action={LINK_NODE} className={classes.fab}>
      <LinkIcon />
    </Fab>
  </div>
);

export default withStyles(styles)(CardFooter);
