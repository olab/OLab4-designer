// @flow
/*
This component is being used as shape of background pattern;

gridDotSize - size of the point;

More about circle svg element:
https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle
*/
import React, { Component } from 'react';

import type { ICircleProps } from './types';

export class Circle extends Component<ICircleProps> {
  static defaultProps: ICircleProps = {
    gridDotSize: 2,
  }

  render() {
    const { gridDotSize } = this.props;

    return (
      <circle
        className="circle"
        cx={gridDotSize}
        cy={gridDotSize}
        r={gridDotSize}
      />
    );
  }
}

export default Circle;
