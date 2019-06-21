// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
} from '@material-ui/core';

import type { IOutlinedSelectProps } from './types';

import styles from './styles';

const OutlinedSelect = ({
  label, name, labelWidth, classes, value, values, onChange, fullWidth = false,
}: IOutlinedSelectProps) => (
  <FormControl variant="outlined" className={fullWidth ? classes.fullWidth : ''}>
    <InputLabel>{label}</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      input={(
        <OutlinedInput
          labelWidth={labelWidth}
          name={name}
          classes={{ input: classes.inputSelect }}
        />
      )}
    >
      {values.map((val: string) => (
        <MenuItem key={val} value={val}>{val}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default withStyles(styles)(OutlinedSelect);
