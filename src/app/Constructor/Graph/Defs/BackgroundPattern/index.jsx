// @flow
/*
This <pattern /> locates in defs section.
It is being used for background pattern;

For more info about <pattern />:
https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern
*/
import React, { Component } from 'react';
import Circle from './Circle';

import type { IBackgroundPatternProps } from './types';

import { patternId } from './config';

export class BackgroundPattern extends Component<IBackgroundPatternProps> {
  static defaultProps: IBackgroundPatternProps = {
    gridSpacing: 36,
    gridDotSize: 2,
  }

  render() {
    const { gridSpacing, gridDotSize } = this.props;

    return (
      <pattern
        id={`${patternId}`}
        key={`${patternId}`}
        width={gridSpacing}
        height={gridSpacing}
        patternUnits="userSpaceOnUse"
      >
        <Circle
          gridDotSize={gridDotSize}
        />
      </pattern>
    );
  }
}

export default BackgroundPattern;
