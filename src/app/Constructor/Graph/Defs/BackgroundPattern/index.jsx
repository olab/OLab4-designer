// @flow
import React, { Component } from 'react';
import Circle from './Circle';

import type { IBackgroundPatternProps } from './types';

class BackgroundPattern extends Component<IBackgroundPatternProps> {
  static defaultProps: IBackgroundPatternProps = {
    gridSpacing: 36,
    gridDotSize: 2,
  }

  render() {
    const { gridSpacing, gridDotSize } = this.props;

    return (
      <pattern
        id="grid"
        key="grid"
        width={gridSpacing}
        height={gridSpacing}
        patternUnits="userSpaceOnUse"
      >
        <Circle
          gridSpacing={gridSpacing}
          gridDotSize={gridDotSize}
        />
      </pattern>
    );
  }
}

export default BackgroundPattern;
