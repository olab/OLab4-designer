// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Switch as MaterialSwitch,
  FormControlLabel,
  InputLabel,
} from '@material-ui/core';

import type { ISwitchProps } from './types';

import styles from './styles';

const Switch = ({
  label, labelPlacement, classes, checked, onChange,
}: ISwitchProps) => (
  <FormControlLabel
    label={(
      <InputLabel>{label}</InputLabel>
    )}
    labelPlacement={labelPlacement}
    classes={{
      root: classes.formControlRoot,
    }}
    control={(
      <MaterialSwitch
        classes={{
          switchBase: classes.iOSSwitchBase,
          bar: classes.iOSBar,
          icon: classes.iOSIcon,
          iconChecked: classes.iOSIconChecked,
          checked: classes.iOSChecked,
        }}
        checked={checked}
        onChange={onChange}
        disableRipple
      />
    )}
  />
);

export default withStyles(styles)(Switch);
