// @flow
import React from 'react';

import ArrowheadMarker from './ArrowHead';
import BackgroundPattern from './BackgroundPattern';
import DropshadowFilter from './DropshadowFilter';

import type {
  IDefsProps,
  IDefsState,
} from './types';

class Defs extends React.Component<IDefsProps, IDefsState> {
  constructor(props: IDefsProps) {
    super(props);
    this.state = {
      graphConfigDefs: [],
    };
  }

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

  static processGraphConfigDefs(typesObj: any, graphConfigDefs: any) {
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
        <ArrowheadMarker
          edgeArrowSize={edgeArrowSize}
        />
        <BackgroundPattern
          gridSpacing={gridSpacing}
          gridDotSize={gridDotSize}
        />
        <DropshadowFilter />
        {renderDefs && renderDefs()}
      </defs>
    );
  }
}

export default Defs;
