// @flow
import generateTmpId from '../../../helpers/generateTmpId';

import { SALT as NODE_SALT } from './Node/config';
import { SALT as EDGE_SALT } from './Edge/config';

export const createNewNode = (mapId, x, y, defaultNodeBody) => {
  const newNodeId = generateTmpId(NODE_SALT);

  return {
    id: newNodeId,
    mapId,
    ...defaultNodeBody,
    x,
    y,
    isSelected: false,
    isFocused: false,
  };
};

export const createNewEdge = (sourceId, targetId, defaultEdgeBody) => {
  const newEdgeId = generateTmpId(EDGE_SALT);

  return {
    id: newEdgeId,
    source: sourceId,
    target: targetId,
    ...defaultEdgeBody,
    isSelected: false,
  };
};

export const spec = {
  drop: (props, monitor, component) => {
    if (!component) {
      return null;
    }

    return monitor.getDifferenceFromInitialOffset();
  },
};

export const collect = conn => ({
  connectDropTarget: conn.dropTarget(),
});
