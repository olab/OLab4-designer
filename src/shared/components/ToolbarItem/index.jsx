// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

import type { IToolbarItemProps } from './types';

import styles from './styles';

const ToolbarItem = ({
  id, label, onClick, icon: Icon, classes,
}: IToolbarItemProps) => (
  <IconButton
    title={label}
    aria-label={label}
    onClick={() => onClick(id)}
    className={classes.iconButton}
  >
    <Icon />
  </IconButton>
);

export default withStyles(styles)(ToolbarItem);
