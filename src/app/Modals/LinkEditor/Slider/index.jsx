// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Slider as MaterialSlider } from '@material-ui/lab';
import { InputLabel } from '@material-ui/core';

import type { ISliderProps } from './types';

import styles, {
  SliderWrapper,
  SliderValue,
} from './styles';

const Slider = ({
  label, value, classes, min, max, step, onChange,
}: ISliderProps) => (
  <div>
    <InputLabel>{label}</InputLabel>
    <SliderWrapper>
      <MaterialSlider
        classes={{ container: classes.slider }}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />
      <SliderValue>{value}</SliderValue>
    </SliderWrapper>
  </div>
);

export default withStyles(styles)(Slider);
