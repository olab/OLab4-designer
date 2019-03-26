// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';

import type { Props } from './types';

import { LinkIcon, AddIcon } from '../icons';

import styles from './styles';


const CardFooter = ({ classes }: Props) => (
  <div className={classes.footer}>
    <div>
      <Fab aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
    <div>
      <Fab aria-label="Add" className={classes.fab}>
        <LinkIcon />
      </Fab>
    </div>
  </div>
);

export default withStyles(styles)(CardFooter);
