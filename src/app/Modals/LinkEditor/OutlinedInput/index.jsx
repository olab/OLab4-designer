// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

import type { IOutlinedInputProps } from './types';

import styles from './styles';

const OutlinedInput = ({
  name, label, classes, value, onChange, fullWidth = false,
}: IOutlinedInputProps) => (
  <TextField
    type="text"
    name={name}
    label={label}
    value={value}
    onChange={onChange}
    margin="none"
    variant="outlined"
    InputProps={{ classes: { input: classes.input } }}
    fullWidth={fullWidth}
  />
);

export default withStyles(styles)(OutlinedInput);
