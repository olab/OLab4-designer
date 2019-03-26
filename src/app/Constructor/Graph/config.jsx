// @flow
import React from 'react';

const standardEdge = 'standardEdge';

const StandardEdgeShape = (
  <symbol width="24" height="24" viewBox="0 0 24 24" id={standardEdge}>
    <circle r="12" transform="matrix(1 0 0 -1 12 12)" fill="#D3DAE1" />

    <g transform="translate(18, 11) rotate(90)">
      <path d="M1 13L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </symbol>
);

export const EdgeTypes = {
  standardEdge: {
    shape: StandardEdgeShape,
    shapeId: `#${standardEdge}`,
  },
};

export default {
  EdgeTypes,
};
