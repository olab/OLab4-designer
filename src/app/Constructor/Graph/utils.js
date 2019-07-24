// @flow
import generateTmpId from '../../../helpers/generateTmpId';

import { SALT as NODE_SALT } from './Node/config';
import { SALT as EDGE_SALT } from './Edge/config';

import type {
  DefaultEdge as DefaultsEdgeType,
  DefaultNode as DefaultsNodeType,
} from '../../reducers/defaults/types';

export const createNewNode = (
  mapId: number,
  x: number,
  y: number,
  defaultNodeBody: DefaultsNodeType,
) => {
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

export const createNewEdge = (
  sourceId: number,
  targetId: number,
  defaultEdgeBody: DefaultsEdgeType,
) => {
  const newEdgeId = generateTmpId(EDGE_SALT);

  return {
    id: newEdgeId,
    source: sourceId,
    target: targetId,
    ...defaultEdgeBody,
    isSelected: false,
  };
};
