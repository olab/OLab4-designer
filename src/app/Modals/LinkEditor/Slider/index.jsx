// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Slider as MaterialSlider } from '@material-ui/lab';
import { InputLabel } from '@material-ui/core';

import type { ISliderProps } from './types';

import styles from './styles';

const Slider = ({
  label, value, classes, min, max, onChange,
}: ISliderProps) => (
  <div>
    <InputLabel>{label}</InputLabel>
    <MaterialSlider
      classes={{ container: classes.slider }}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
    />
  </div>
);

export default withStyles(styles)(Slider);
