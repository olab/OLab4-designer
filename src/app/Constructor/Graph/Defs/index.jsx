// @flow
/*
This component stores reusable html items that
are being used by such items like: arrows/nodes/backgrounds etc.

In turn these items are being copied in shadow roots or in css-styles by 'id'.
*/
import React from 'react';

import ArrowHead from './ArrowHead';
import BackgroundPattern from './BackgroundPattern';

import type {
  IDefsProps,
  IDefsState,
} from './types';

export class Defs extends React.Component<IDefsProps, IDefsState> {
  state: IDefsState = {
    graphConfigDefs: [],
  };

  static defaultProps: IDefsProps = {
    gridSpacing: 36,
    edgeArrowSize: 6,
    gridDotSize: 2,
    renderDefs: () => null,
  };

  static getDerivedStateFromProps(nextProps: IDefsProps) {
    const graphConfigDefs = [];
    Defs.processGraphConfigDefs(nextProps.edgeTypes, graphConfigDefs);

    return {
      graphConfigDefs,
    };
  }

  /**
   *
   *
   * @static
   * @param {*} typesObj
   * @param {Array<*>} graphConfigDefs
   * @memberof Defs
   *
   * This method takes all items that should be stored in <defs /> section
   * and set them key prop(aka list with items).
   * All items should have the following structure:
   {
    <typeOfStructure_1>: {
      <sub-type_1>: {
        shape: <jsx>,
        shapeId: '#${id}',
        ...
      },
      ...
    },
    ...
  }
   */
  static processGraphConfigDefs(typesObj: any, graphConfigDefs: Array<any>) {
    Object.keys(typesObj).forEach((type) => {
      const safeId = typesObj[type].shapeId ? typesObj[type].shapeId.replace('#', '') : 'graphdef';
      graphConfigDefs.push(React.cloneElement(typesObj[type].shape, { key: `${safeId}-${graphConfigDefs.length + 1}` }));
    });
  }

  render() {
    const { graphConfigDefs } = this.state;
    const {
      edgeArrowSize, gridSpacing, gridDotSize, renderDefs,
    } = this.props;

    return (
      <defs>
        {graphConfigDefs}
        <ArrowHead
          edgeArrowSize={edgeArrowSize}
        />
        <BackgroundPattern
          gridSpacing={gridSpacing}
          gridDotSize={gridDotSize}
        />
        {renderDefs && renderDefs()}
      </defs>
    );
  }
}

export default Defs;
